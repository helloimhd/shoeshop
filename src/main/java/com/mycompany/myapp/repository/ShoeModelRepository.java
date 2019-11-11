package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.ShoeModel;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ShoeModel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ShoeModelRepository extends JpaRepository<ShoeModel, Long> {

}
