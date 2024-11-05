package com.autolink.repositories;

import com.autolink.entities.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VeiculoRepository extends JpaRepository<Veiculo, Integer> {
    List<Veiculo> findByUsuarioId(Integer usuarioId);
}
