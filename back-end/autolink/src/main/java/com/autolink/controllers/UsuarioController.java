package com.autolink.controllers;

import com.autolink.dto.request.usuario.UsuarioCriacaoDto;
import com.autolink.dto.request.usuario.UsuarioRequestDto;
import com.autolink.dto.response.usuario.UsuarioResponseDto;
import com.autolink.entities.Usuario;
import com.autolink.mapper.UsuarioMapper;
import com.autolink.service.UsuarioService;
import com.autolink.service.autenticacao.dto.UsuarioLoginDto;
import com.autolink.service.autenticacao.dto.UsuarioTokenDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.ResponseEntity.created;
import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("{id}")
    public ResponseEntity<UsuarioResponseDto> getUsuario(@PathVariable Integer id) {
        Usuario usuario = usuarioService.buscarPorId(id);
        UsuarioResponseDto usuarioPorId = UsuarioMapper.toUsuarioResponseDto(usuario);
        return ok(usuarioPorId);
    }
    @PostMapping
    public ResponseEntity<UsuarioResponseDto> criar (@RequestBody @Valid UsuarioCriacaoDto usuarioCriacaoDto) {

        Usuario usuario = UsuarioMapper.toEntity(usuarioCriacaoDto);
        Usuario usuarioSalvo = usuarioService.criarUsuario(usuario);
        UsuarioResponseDto dto = UsuarioMapper.toUsuarioResponseDto(usuarioSalvo);
        return created(null).body(dto);

    }
    @PostMapping("/login")
    public ResponseEntity<UsuarioTokenDto> login(@RequestBody UsuarioLoginDto usuarioLoginDto) {
        UsuarioTokenDto usuarioTokenDto = usuarioService.autenticar(usuarioLoginDto);

        return ResponseEntity.status(200).body(usuarioTokenDto);
    }
    @DeleteMapping("{id}")
    public ResponseEntity<UsuarioResponseDto> remover(@PathVariable Integer id) {
        usuarioService.buscarPorId(id);
        usuarioService.excluirUsuario(id);
        return ResponseEntity.noContent().build();
    }
    @PatchMapping(path = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<UsuarioResponseDto> atualizar(@PathVariable Integer id, @ModelAttribute @Valid UsuarioRequestDto usuarioRequestDto) {
        usuarioService.buscarPorId(id);
        String senha = usuarioService.buscarPorId(id).getSenha();
        Usuario usuario = UsuarioMapper.toEntity(usuarioRequestDto);
        usuario.setId(id);
        usuario.setSenha(senha);
        Usuario salvo = usuarioService.atualizarUsuario(usuario);
        UsuarioResponseDto dto = UsuarioMapper.toUsuarioResponseDto(salvo);
        return ok(dto);
    }
}
