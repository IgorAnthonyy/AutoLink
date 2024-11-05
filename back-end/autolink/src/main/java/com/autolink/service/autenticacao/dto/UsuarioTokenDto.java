package com.autolink.service.autenticacao.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioTokenDto {

    private Integer id;
    private String nome;
    private String sobrenome;
    private String email;
    private String telefone;
    private String token;
    private String imagem;
    private String cep;
    private String logradouro;
    private String estado;
    private String complemento;
    private String bairro;
    private Integer numero;
}