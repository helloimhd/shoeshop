package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.ShoeModelService;
import com.mycompany.myapp.domain.ShoeModel;
import com.mycompany.myapp.repository.ShoeModelRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link ShoeModel}.
 */
@Service
@Transactional
public class ShoeModelServiceImpl implements ShoeModelService {

    private final Logger log = LoggerFactory.getLogger(ShoeModelServiceImpl.class);

    private final ShoeModelRepository shoeModelRepository;

    public ShoeModelServiceImpl(ShoeModelRepository shoeModelRepository) {
        this.shoeModelRepository = shoeModelRepository;
    }

    /**
     * Save a shoeModel.
     *
     * @param shoeModel the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ShoeModel save(ShoeModel shoeModel) {
        log.debug("Request to save ShoeModel : {}", shoeModel);
        return shoeModelRepository.save(shoeModel);
    }

    /**
     * Get all the shoeModels.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<ShoeModel> findAll() {
        log.debug("Request to get all ShoeModels");
        return shoeModelRepository.findAll();
    }


    /**
     * Get one shoeModel by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ShoeModel> findOne(Long id) {
        log.debug("Request to get ShoeModel : {}", id);
        return shoeModelRepository.findById(id);
    }

    /**
     * Delete the shoeModel by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ShoeModel : {}", id);
        shoeModelRepository.deleteById(id);
    }
}
