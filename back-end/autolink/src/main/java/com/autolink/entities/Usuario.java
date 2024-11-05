package com.autolink.entities;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Blob;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nome;
    private String sobrenome;
    private String telefone;
    private String email;
    private String senha;
    @Column(columnDefinition = "VARCHAR(MAX)")
    private String imagem;
    private String cep;
    private String logradouro;
    private String estado;
    private String complemento;
    private String bairro;
    private Integer numero;
}
