package com.games.app.services;

import com.games.app.dto.GameDTO;
import com.games.app.dto.GameMinDTO;
import com.games.app.entities.Game;
import com.games.app.projections.GameMinProjection;
import com.games.app.repositories.GameRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    //signfica que ele vai somente ler dados
    @Transactional(readOnly=true)
    public GameDTO findById(Long id){
        // Verifica se o ID é nulo
        if (id == null) {
            throw new IllegalArgumentException("O ID não pode ser nulo");
        }

        // Busca o jogo no repositório usando o ID
        Optional<Game> result = gameRepository.findById(id);

        // Verifica se o jogo foi encontrado
        if (result.isEmpty()) {
            throw new EntityNotFoundException("Jogo com ID " + id + " não encontrado");
        }

        // Converte o jogo encontrado em DTO e retorna
        return new GameDTO(result.get());
    }

    @Transactional(readOnly=true)
    public List<GameMinDTO> findAll(){
       List<Game> result = gameRepository.findAll();  //objeto com todos os dados
       List<GameMinDTO> dto = result.stream().map(x -> new GameMinDTO(x)).toList();
       return dto;
    }

    @Transactional(readOnly=true)
    public List<GameMinDTO> findByList(Long listId){
        List<GameMinProjection> result = gameRepository.searchByList(listId);  //objeto com todos os dados
        List<GameMinDTO> dto = result.stream().map(x -> new GameMinDTO(x)).toList();
        return dto;
    }
}
