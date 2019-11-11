package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class ShoeModelTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ShoeModel.class);
        ShoeModel shoeModel1 = new ShoeModel();
        shoeModel1.setId(1L);
        ShoeModel shoeModel2 = new ShoeModel();
        shoeModel2.setId(shoeModel1.getId());
        assertThat(shoeModel1).isEqualTo(shoeModel2);
        shoeModel2.setId(2L);
        assertThat(shoeModel1).isNotEqualTo(shoeModel2);
        shoeModel1.setId(null);
        assertThat(shoeModel1).isNotEqualTo(shoeModel2);
    }
}
