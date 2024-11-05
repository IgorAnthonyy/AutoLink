package com.autolink.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Veiculo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String categoria;
    private String modelo;
    private String marca;
    private Double quilometragem;
    private LocalDate ano;
    private Double preco;
    private String cor;
    private String tipo;

    @Column(columnDefinition = "VARCHAR(MAX)")
    private String imagem;
    @ManyToOne
    private Usuario usuario;
}
