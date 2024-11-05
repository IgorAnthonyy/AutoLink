package com.autolink.dto.request.veiculo;

import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VeiculoCriacaoDto {

    @NotBlank(message = "A categoria é obrigatória")
    private String categoria;

    @NotBlank(message = "O modelo é obrigatório")
    @Size(max = 50, message = "O modelo deve ter no máximo 50 caracteres")
    private String modelo;

    @NotBlank(message = "A marca é obrigatória")
    @Size(max = 50, message = "A marca deve ter no máximo 50 caracteres")
    private String marca;

    @NotNull(message = "A quilometragem é obrigatória")
    @Positive
    private Double quilometragem;

    @NotNull(message = "O ano é obrigatório")
    @PastOrPresent(message = "O ano deve ser uma data no passado ou no presente")
    private LocalDate ano;

    @NotNull(message = "O preço é obrigatório")
    @DecimalMin(value = "0.0", inclusive = false, message = "O preço deve ser maior que zero")
    private Double preco;

    @NotBlank(message = "A cor é obrigatória")
    private String cor;

    @NotBlank(message = "O tipo é obrigatório")
    private String tipo;

    @NotNull(message = "O usuário é obrigatório")
    private Integer usuarioId;
    @NotNull
    private MultipartFile imagem;
}
