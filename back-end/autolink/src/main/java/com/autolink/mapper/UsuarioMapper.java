package com.autolink.mapper;

import com.autolink.dto.request.usuario.UsuarioRequestDto;
import com.autolink.service.autenticacao.dto.UsuarioTokenDto;
import com.autolink.dto.request.usuario.UsuarioCriacaoDto;
import com.autolink.dto.response.usuario.UsuarioResponseDto;
import com.autolink.entities.Usuario;

import java.util.Base64;

public class UsuarioMapper {
    public static UsuarioResponseDto toUsuarioResponseDto(Usuario usuario) {
        if(usuario == null) return null;
        return UsuarioResponseDto
                .builder()
                .id(usuario.getId())
                .nome(usuario.getNome())
                .sobrenome(usuario.getSobrenome())
                .telefone(usuario.getTelefone())
                .email(usuario.getEmail())
                .imagem(usuario.getImagem())
                .cep(usuario.getCep())
                .estado(usuario.getEstado())
                .bairro(usuario.getBairro())
                .complemento(usuario.getComplemento())
                .logradouro(usuario.getLogradouro())
                .numero(usuario.getNumero())
                .build();
    }
    public static Usuario toEntity(UsuarioCriacaoDto usuarioCriacaoDto) {
        if (usuarioCriacaoDto == null) return null;

        return Usuario.builder()
                .nome(usuarioCriacaoDto.getNome())
                .sobrenome(usuarioCriacaoDto.getSobrenome())
                .telefone(usuarioCriacaoDto.getTelefone())
                .email(usuarioCriacaoDto.getEmail())
                .senha(usuarioCriacaoDto.getSenha())
                .cep(usuarioCriacaoDto.getCep())
                .logradouro(usuarioCriacaoDto.getLogradouro())
                .estado(usuarioCriacaoDto.getEstado())
                .complemento(usuarioCriacaoDto.getComplemento())
                .bairro(usuarioCriacaoDto.getBairro())
                .numero(usuarioCriacaoDto.getNumero())
                .build();
    }
    public static Usuario toEntity(UsuarioRequestDto UsuarioRequestDto) {
        if (UsuarioRequestDto == null) return null;
        String base64Image = null;
        if (UsuarioRequestDto.getImagem() != null && !UsuarioRequestDto.getImagem().isEmpty()) {
            try {

                base64Image = Base64.getEncoder().encodeToString(UsuarioRequestDto.getImagem().getBytes());
            } catch (Exception e) {
                throw new RuntimeException("Erro ao converter a imagem para Base64", e);
            }
        }

        return Usuario.builder()
                .nome(UsuarioRequestDto.getNome())
                .sobrenome(UsuarioRequestDto.getSobrenome())
                .telefone(UsuarioRequestDto.getTelefone())
                .email(UsuarioRequestDto.getEmail())

                .imagem(base64Image)
                .cep(UsuarioRequestDto.getCep())
                .logradouro(UsuarioRequestDto.getLogradouro())
                .estado(UsuarioRequestDto.getEstado())
                .complemento(UsuarioRequestDto.getComplemento())
                .bairro(UsuarioRequestDto.getBairro())
                .numero(UsuarioRequestDto.getNumero())
                .build();
    }
    public static UsuarioTokenDto of(Usuario usuario, String token) {
        UsuarioTokenDto usuarioTokenDto = new UsuarioTokenDto();

        usuarioTokenDto.setId(usuario.getId());
        usuarioTokenDto.setNome(usuario.getNome());
        usuarioTokenDto.setSobrenome(usuario.getSobrenome());
        usuarioTokenDto.setEmail(usuario.getEmail());
        usuarioTokenDto.setTelefone(usuario.getTelefone());
        usuarioTokenDto.setToken(token);
        usuarioTokenDto.setCep(usuario.getCep());
        usuarioTokenDto.setLogradouro(usuario.getLogradouro());
        usuarioTokenDto.setEstado(usuario.getEstado());
        usuarioTokenDto.setComplemento(usuario.getComplemento());
        usuarioTokenDto.setBairro(usuario.getBairro());
        usuarioTokenDto.setNumero(usuario.getNumero());

        return usuarioTokenDto;
    }
}
