package com.nadunkawishika.helloshoesapplicationserver.exception.customExceptions;

public class NotFoundException extends RuntimeException {
    public NotFoundException(String message) {
        super(message);
    }
}
