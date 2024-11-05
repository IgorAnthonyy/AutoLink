package com.autolink.dto.response.veiculo;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;


@Data
@Builder
public class VeiculoResponseDto {
    private Integer id;
    private String categoria;
    private String modelo;
    private String marca;
    private Double quilometragem;
    private LocalDate ano;
    private Double preco;
    private String cor;
    private String tipo;
    private String imagem;

}
