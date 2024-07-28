package com.nadunkawishika.helloshoesapplicationserver.exception.customExceptions;

public class AlreadyExistException extends RuntimeException {
    public AlreadyExistException(String message) {
        super(message);
    }
}
