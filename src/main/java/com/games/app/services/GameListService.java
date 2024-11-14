package com.games.app.services;

import com.games.app.dto.GameListDTO;
import com.games.app.dto.GameMinDTO;
import com.games.app.entities.Game;
import com.games.app.entities.GameList;
import com.games.app.repositories.GameListRepository;
import com.games.app.repositories.GameRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class GameListService {

    @Autowired
    private GameListRepository gameListRepository;

    @Transactional(readOnly=true)
    public List<GameListDTO> findAll(){
       List<GameList> result = gameListRepository.findAll();  //objeto com todos os dados
       List<GameListDTO> dto = result.stream().map(x -> new GameListDTO(x)).toList();
       return dto;
    }
}
