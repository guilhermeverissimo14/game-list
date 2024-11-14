package com.games.app.repositories;

import com.games.app.entities.GameList;
import org.springframework.data.jpa.repository.JpaRepository;

// Game é o nome da entidade, Long é o tipo do Id daquela entidade.
public interface GameListRepository extends JpaRepository<GameList, Long> {
}
