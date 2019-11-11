package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.ShoeModel;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link ShoeModel}.
 */
public interface ShoeModelService {

    /**
     * Save a shoeModel.
     *
     * @param shoeModel the entity to save.
     * @return the persisted entity.
     */
    ShoeModel save(ShoeModel shoeModel);

    /**
     * Get all the shoeModels.
     *
     * @return the list of entities.
     */
    List<ShoeModel> findAll();


    /**
     * Get the "id" shoeModel.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ShoeModel> findOne(Long id);

    /**
     * Delete the "id" shoeModel.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
