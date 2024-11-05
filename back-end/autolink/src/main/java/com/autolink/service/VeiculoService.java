package com.autolink.service;

import com.autolink.entities.Veiculo;
import com.autolink.repositories.VeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class VeiculoService {
    @Autowired
    private VeiculoRepository veiculoRepository;


    public Veiculo adicionarVeiculo(Veiculo veiculo){
        return veiculoRepository.save(veiculo);
    }
    public Veiculo atualizarVeiculo(Veiculo veiculo){
        return veiculoRepository.save(veiculo);
    }

    public Veiculo buscarVeiculo(Integer id){
        return veiculoRepository.findById(id).orElseThrow(()->
                new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
    public List<Veiculo> buscarVeiculosPorUsuario(Integer id){
        return veiculoRepository.findByUsuarioId(id);
    }

}
