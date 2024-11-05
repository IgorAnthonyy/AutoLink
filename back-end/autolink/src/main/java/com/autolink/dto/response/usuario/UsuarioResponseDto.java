package com.autolink.dto.response.usuario;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UsuarioResponseDto {
    private Integer id;
    private String nome;
    private String sobrenome;
    private String telefone;
    private String email;
    private String imagem;
    private String cep;
    private String logradouro;
    private String estado;
    private String complemento;
    private String bairro;
    private Integer numero;
}
