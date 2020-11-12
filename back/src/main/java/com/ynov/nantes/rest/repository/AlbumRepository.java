package com.ynov.nantes.rest.repository;

import java.util.List;
import java.util.Set;

import com.ynov.nantes.rest.entity.Album;
import com.ynov.nantes.rest.entity.Artist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface AlbumRepository extends JpaRepository<Album, Integer> {

    @Query("SELECT a FROM Album a WHERE a.name LIKE %:name%")
    public List<Album> findByName(@Param("name") String name);

    public List<Album> findByArtist(Artist artist);
}