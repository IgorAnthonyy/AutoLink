package com.autolink.dto.request.usuario;

import jakarta.validation.constraints.*;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
public class UsuarioCriacaoDto {

    @NotBlank
    @Size(min = 3, max = 30)
    private String nome;

    @NotBlank
    @Size(min = 3, max = 30)
    private String sobrenome;

    @NotBlank
    private String telefone;

    @NotBlank
    @Email(message = "Email deve ser válido.")
    private String email;

    @NotBlank
    @Size(min = 4, message = "A senha deve ter pelo menos 4 caracteres.")
    private String senha;


    @NotBlank
    @Pattern(regexp = "^[0-9]{5}-[0-9]{3}$", message = "CEP deve estar no formato 12345-678.")
    private String cep;

    @NotBlank
    @Size(min = 3, max = 100)
    private String logradouro;

    @NotBlank
    @Size(min = 2, max = 50)
    private String estado;

    private String complemento;

    @NotBlank
    @Size(min = 3, max = 50)
    private String bairro;

    @NotNull
    @Min(1)
    private Integer numero;
}
