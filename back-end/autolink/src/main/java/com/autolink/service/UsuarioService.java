package com.autolink.service;

import com.autolink.config.security.jwt.GerenciadorTokenJwt;
import com.autolink.exception.EmailJaCadastradoException;
import com.autolink.service.autenticacao.dto.UsuarioTokenDto;
import com.autolink.entities.Usuario;
import com.autolink.mapper.UsuarioMapper;
import com.autolink.repositories.UsuarioRepository;
import com.autolink.service.autenticacao.dto.UsuarioLoginDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UsuarioService {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private GerenciadorTokenJwt gerenciadorTokenJwt;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario buscarPorId(Integer Id){
        return usuarioRepository.findById(Id).orElseThrow(()->
                new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
    public Usuario criarUsuario(Usuario usuario) {
        Boolean emailJaCadastrado = usuarioRepository.findByEmail(usuario.getEmail()).isPresent();

        if (emailJaCadastrado) {
            throw new EmailJaCadastradoException("Este e-mail já está cadastrado.");
        }

        String senhaCriptografada = passwordEncoder.encode(usuario.getSenha());
        usuario.setSenha(senhaCriptografada);

        // Salvar o usuário no banco de dados
        return usuarioRepository.save(usuario);
    }
    public Usuario atualizarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }
    public void excluirUsuario(Integer id) {
        buscarPorId(id);
        usuarioRepository.deleteById(id);
    }
    public UsuarioTokenDto autenticar(UsuarioLoginDto usuarioLoginDto) {

        final UsernamePasswordAuthenticationToken credentials = new UsernamePasswordAuthenticationToken(
                usuarioLoginDto.getEmail(), usuarioLoginDto.getSenha());

        final Authentication authentication = this.authenticationManager.authenticate(credentials);

        Usuario usuarioAutenticado =
                usuarioRepository.findByEmail(usuarioLoginDto.getEmail())
                        .orElseThrow(
                                () -> new ResponseStatusException(404, "Email do usuário não cadastrado", null)
                        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        final String token = gerenciadorTokenJwt.generateToken(authentication);

        return UsuarioMapper.of(usuarioAutenticado, token);
    }
}
