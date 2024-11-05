package com.autolink.controllers;

import com.autolink.dto.request.veiculo.VeiculoCriacaoDto;
import com.autolink.dto.response.veiculo.VeiculoResponseDto;
import com.autolink.entities.Usuario;
import com.autolink.entities.Veiculo;
import com.autolink.mapper.VeiculoMapper;
import com.autolink.repositories.UsuarioRepository;

import com.autolink.service.VeiculoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


import java.util.List;

@RestController
@RequestMapping("/veiculos")
public class VeiculoController {

    @Autowired
    private VeiculoService veiculoService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<VeiculoResponseDto> criar(
            @ModelAttribute @Valid VeiculoCriacaoDto veiculoCriacaoDto) {
        Veiculo veiculo = VeiculoMapper.toEntity(veiculoCriacaoDto);
        Usuario usuario = usuarioRepository.findById(veiculoCriacaoDto.getUsuarioId()).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND
        ));

        veiculo.setUsuario(usuario);
        veiculoService.adicionarVeiculo(veiculo);

        VeiculoResponseDto responseDto = VeiculoMapper.toResponseDto(veiculo);

        return ResponseEntity.ok(responseDto);
    }
    @PatchMapping(path="{id}",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<VeiculoResponseDto> editar(@PathVariable Integer id,
            @ModelAttribute @Valid VeiculoCriacaoDto veiculoCriacaoDto) {
        Veiculo veiculo = VeiculoMapper.toEntity(veiculoCriacaoDto);
        veiculo.setId(id);
        Usuario usuario = usuarioRepository.findById(veiculoCriacaoDto.getUsuarioId()).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND
        ));

        veiculo.setUsuario(usuario);
        veiculoService.atualizarVeiculo(veiculo);


        VeiculoResponseDto responseDto = VeiculoMapper.toResponseDto(veiculo);

        return ResponseEntity.ok(responseDto);
    }
    @GetMapping("/carro-por-usuario/{id}")
    public ResponseEntity<List<VeiculoResponseDto>> listarCarroPorUuario(@PathVariable Integer id){
        List<Veiculo> veiculos = veiculoService.buscarVeiculosPorUsuario(id);
        List<VeiculoResponseDto> responseDtos = veiculos.stream()
                .map(VeiculoMapper::toResponseDto)
                .toList();

        return ResponseEntity.ok(responseDtos);

    }
    @GetMapping("{id}")
    public ResponseEntity<VeiculoResponseDto> buscarPorId(@PathVariable Integer id){
        Veiculo veiculo = veiculoService.buscarVeiculo(id);
        VeiculoResponseDto dto  = VeiculoMapper.toResponseDto(veiculo);
        return ResponseEntity.ok(dto);
    }
}
