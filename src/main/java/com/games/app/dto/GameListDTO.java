package com.games.app.dto;

import com.games.app.entities.GameList;

public class GameListDTO {

    private Long id;
    private String name;

    public GameListDTO(){
    }

    public GameListDTO(GameList entity) {
        id = entity.getId();
        name = entity.getName();
    }

//    Como não usei a propiedae beUtils so posso implementar os gets
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
