package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.ShoeshopApp;
import com.mycompany.myapp.domain.ShoeModel;
import com.mycompany.myapp.repository.ShoeModelRepository;
import com.mycompany.myapp.service.ShoeModelService;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ShoeModelResource} REST controller.
 */
@SpringBootTest(classes = ShoeshopApp.class)
public class ShoeModelResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_BRAND = "AAAAAAAAAA";
    private static final String UPDATED_BRAND = "BBBBBBBBBB";

    private static final Float DEFAULT_PRICE = 1F;
    private static final Float UPDATED_PRICE = 2F;

    @Autowired
    private ShoeModelRepository shoeModelRepository;

    @Autowired
    private ShoeModelService shoeModelService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restShoeModelMockMvc;

    private ShoeModel shoeModel;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ShoeModelResource shoeModelResource = new ShoeModelResource(shoeModelService);
        this.restShoeModelMockMvc = MockMvcBuilders.standaloneSetup(shoeModelResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ShoeModel createEntity(EntityManager em) {
        ShoeModel shoeModel = new ShoeModel()
            .name(DEFAULT_NAME)
            .brand(DEFAULT_BRAND)
            .price(DEFAULT_PRICE);
        return shoeModel;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ShoeModel createUpdatedEntity(EntityManager em) {
        ShoeModel shoeModel = new ShoeModel()
            .name(UPDATED_NAME)
            .brand(UPDATED_BRAND)
            .price(UPDATED_PRICE);
        return shoeModel;
    }

    @BeforeEach
    public void initTest() {
        shoeModel = createEntity(em);
    }

    @Test
    @Transactional
    public void createShoeModel() throws Exception {
        int databaseSizeBeforeCreate = shoeModelRepository.findAll().size();

        // Create the ShoeModel
        restShoeModelMockMvc.perform(post("/api/shoe-models")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shoeModel)))
            .andExpect(status().isCreated());

        // Validate the ShoeModel in the database
        List<ShoeModel> shoeModelList = shoeModelRepository.findAll();
        assertThat(shoeModelList).hasSize(databaseSizeBeforeCreate + 1);
        ShoeModel testShoeModel = shoeModelList.get(shoeModelList.size() - 1);
        assertThat(testShoeModel.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testShoeModel.getBrand()).isEqualTo(DEFAULT_BRAND);
        assertThat(testShoeModel.getPrice()).isEqualTo(DEFAULT_PRICE);
    }

    @Test
    @Transactional
    public void createShoeModelWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = shoeModelRepository.findAll().size();

        // Create the ShoeModel with an existing ID
        shoeModel.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restShoeModelMockMvc.perform(post("/api/shoe-models")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shoeModel)))
            .andExpect(status().isBadRequest());

        // Validate the ShoeModel in the database
        List<ShoeModel> shoeModelList = shoeModelRepository.findAll();
        assertThat(shoeModelList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllShoeModels() throws Exception {
        // Initialize the database
        shoeModelRepository.saveAndFlush(shoeModel);

        // Get all the shoeModelList
        restShoeModelMockMvc.perform(get("/api/shoe-models?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(shoeModel.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].brand").value(hasItem(DEFAULT_BRAND)))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getShoeModel() throws Exception {
        // Initialize the database
        shoeModelRepository.saveAndFlush(shoeModel);

        // Get the shoeModel
        restShoeModelMockMvc.perform(get("/api/shoe-models/{id}", shoeModel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(shoeModel.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.brand").value(DEFAULT_BRAND))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingShoeModel() throws Exception {
        // Get the shoeModel
        restShoeModelMockMvc.perform(get("/api/shoe-models/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateShoeModel() throws Exception {
        // Initialize the database
        shoeModelService.save(shoeModel);

        int databaseSizeBeforeUpdate = shoeModelRepository.findAll().size();

        // Update the shoeModel
        ShoeModel updatedShoeModel = shoeModelRepository.findById(shoeModel.getId()).get();
        // Disconnect from session so that the updates on updatedShoeModel are not directly saved in db
        em.detach(updatedShoeModel);
        updatedShoeModel
            .name(UPDATED_NAME)
            .brand(UPDATED_BRAND)
            .price(UPDATED_PRICE);

        restShoeModelMockMvc.perform(put("/api/shoe-models")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedShoeModel)))
            .andExpect(status().isOk());

        // Validate the ShoeModel in the database
        List<ShoeModel> shoeModelList = shoeModelRepository.findAll();
        assertThat(shoeModelList).hasSize(databaseSizeBeforeUpdate);
        ShoeModel testShoeModel = shoeModelList.get(shoeModelList.size() - 1);
        assertThat(testShoeModel.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testShoeModel.getBrand()).isEqualTo(UPDATED_BRAND);
        assertThat(testShoeModel.getPrice()).isEqualTo(UPDATED_PRICE);
    }

    @Test
    @Transactional
    public void updateNonExistingShoeModel() throws Exception {
        int databaseSizeBeforeUpdate = shoeModelRepository.findAll().size();

        // Create the ShoeModel

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restShoeModelMockMvc.perform(put("/api/shoe-models")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shoeModel)))
            .andExpect(status().isBadRequest());

        // Validate the ShoeModel in the database
        List<ShoeModel> shoeModelList = shoeModelRepository.findAll();
        assertThat(shoeModelList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteShoeModel() throws Exception {
        // Initialize the database
        shoeModelService.save(shoeModel);

        int databaseSizeBeforeDelete = shoeModelRepository.findAll().size();

        // Delete the shoeModel
        restShoeModelMockMvc.perform(delete("/api/shoe-models/{id}", shoeModel.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ShoeModel> shoeModelList = shoeModelRepository.findAll();
        assertThat(shoeModelList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
