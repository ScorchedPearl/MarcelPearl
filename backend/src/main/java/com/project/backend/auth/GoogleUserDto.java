package com.project.backend.auth;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class GoogleUserDto {
    private String email;
    private String name;
    private String profilePicture;

    public GoogleUserDto() {}

    public GoogleUserDto(String email, String givenName, String picture) {
        this.email = email;
        this.name = name;
        this.profilePicture = profilePicture;
    }

    @Override
    public String toString() {
        return "GoogleUserDto{" +
                "email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", profilePicture='" + profilePicture + '\'' +
                '}';
    }
}

