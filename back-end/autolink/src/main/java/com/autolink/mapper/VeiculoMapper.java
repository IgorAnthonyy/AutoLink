package com.autolink.mapper;

import com.autolink.dto.request.veiculo.VeiculoCriacaoDto;
import com.autolink.dto.response.veiculo.VeiculoResponseDto;

import com.autolink.entities.Veiculo;

import org.springframework.stereotype.Component;

import java.util.Base64;

@Component
public class VeiculoMapper {


    public static Veiculo toEntity(VeiculoCriacaoDto dto) {

        String base64Image = null;
        if (dto.getImagem() != null && !dto.getImagem().isEmpty()) {
            try {

                base64Image = Base64.getEncoder().encodeToString(dto.getImagem().getBytes());
            } catch (Exception e) {
                throw new RuntimeException("Erro ao converter a imagem para Base64", e);
            }
        }

        return Veiculo.builder()
                .categoria(dto.getCategoria())
                .modelo(dto.getModelo())
                .marca(dto.getMarca())
                .quilometragem(dto.getQuilometragem())
                .ano(dto.getAno())
                .preco(dto.getPreco())
                .cor(dto.getCor())
                .tipo(dto.getTipo())
                .imagem(base64Image)
                .build();
    }



    public static VeiculoResponseDto toResponseDto(Veiculo veiculo) {
        return VeiculoResponseDto.builder()
                .id(veiculo.getId())
                .categoria(veiculo.getCategoria())
                .modelo(veiculo.getModelo())
                .marca(veiculo.getMarca())
                .quilometragem(veiculo.getQuilometragem())
                .ano(veiculo.getAno())
                .preco(veiculo.getPreco())
                .cor(veiculo.getCor())
                .tipo(veiculo.getTipo())
                .imagem(veiculo.getImagem())
                .build();
    }
}
