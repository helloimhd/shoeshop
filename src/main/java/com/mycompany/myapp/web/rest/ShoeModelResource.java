package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.ShoeModel;
import com.mycompany.myapp.service.ShoeModelService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.ShoeModel}.
 */
@RestController
@RequestMapping("/api")
public class ShoeModelResource {

    private final Logger log = LoggerFactory.getLogger(ShoeModelResource.class);

    private static final String ENTITY_NAME = "shoeModel";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ShoeModelService shoeModelService;

    public ShoeModelResource(ShoeModelService shoeModelService) {
        this.shoeModelService = shoeModelService;
    }

    /**
     * {@code POST  /shoe-models} : Create a new shoeModel.
     *
     * @param shoeModel the shoeModel to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new shoeModel, or with status {@code 400 (Bad Request)} if the shoeModel has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/shoe-models")
    public ResponseEntity<ShoeModel> createShoeModel(@RequestBody ShoeModel shoeModel) throws URISyntaxException {
        log.debug("REST request to save ShoeModel : {}", shoeModel);
        if (shoeModel.getId() != null) {
            throw new BadRequestAlertException("A new shoeModel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ShoeModel result = shoeModelService.save(shoeModel);
        return ResponseEntity.created(new URI("/api/shoe-models/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /shoe-models} : Updates an existing shoeModel.
     *
     * @param shoeModel the shoeModel to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated shoeModel,
     * or with status {@code 400 (Bad Request)} if the shoeModel is not valid,
     * or with status {@code 500 (Internal Server Error)} if the shoeModel couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/shoe-models")
    public ResponseEntity<ShoeModel> updateShoeModel(@RequestBody ShoeModel shoeModel) throws URISyntaxException {
        log.debug("REST request to update ShoeModel : {}", shoeModel);
        if (shoeModel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ShoeModel result = shoeModelService.save(shoeModel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, shoeModel.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /shoe-models} : get all the shoeModels.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of shoeModels in body.
     */
    @GetMapping("/shoe-models")
    public List<ShoeModel> getAllShoeModels() {
        log.debug("REST request to get all ShoeModels");
        return shoeModelService.findAll();
    }

    /**
     * {@code GET  /shoe-models/:id} : get the "id" shoeModel.
     *
     * @param id the id of the shoeModel to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the shoeModel, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/shoe-models/{id}")
    public ResponseEntity<ShoeModel> getShoeModel(@PathVariable Long id) {
        log.debug("REST request to get ShoeModel : {}", id);
        Optional<ShoeModel> shoeModel = shoeModelService.findOne(id);
        return ResponseUtil.wrapOrNotFound(shoeModel);
    }

    /**
     * {@code DELETE  /shoe-models/:id} : delete the "id" shoeModel.
     *
     * @param id the id of the shoeModel to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/shoe-models/{id}")
    public ResponseEntity<Void> deleteShoeModel(@PathVariable Long id) {
        log.debug("REST request to delete ShoeModel : {}", id);
        shoeModelService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
