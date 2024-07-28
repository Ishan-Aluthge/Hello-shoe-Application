package com.nadunkawishika.helloshoesapplicationserver.exception;

import com.nadunkawishika.helloshoesapplicationserver.dto.resAndReq.ErrorInfoResponse;
import com.nadunkawishika.helloshoesapplicationserver.exception.customExceptions.AlreadyExistException;
import com.nadunkawishika.helloshoesapplicationserver.exception.customExceptions.NotFoundException;
import com.nadunkawishika.helloshoesapplicationserver.exception.customExceptions.RefundNotAvailableException;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.net.UnknownHostException;
import java.time.LocalDateTime;
import java.util.HashMap;

@ControllerAdvice
public class ExceptionsHandler {
    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ResponseEntity<Object> handleException(BadCredentialsException e) {
        return new ResponseEntity<>(ErrorInfoResponse.builder().status(HttpStatus.UNAUTHORIZED).date(LocalDateTime.now()).message("Invalid Credentials").build(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Object> handleException(MethodArgumentNotValidException e) {
        HashMap<String, String> errors = new HashMap<>();
        e.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        String message = "";
        for (String key : errors.keySet()) {
            message = errors.get(key) + ", ";
        }
        message = message.substring(0, message.length() - 1);
        return new ResponseEntity<>(ErrorInfoResponse.builder().status(HttpStatus.BAD_REQUEST).date(LocalDateTime.now()).message(message).build(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AlreadyExistException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ResponseEntity<Object> handleException(AlreadyExistException e) {
        return new ResponseEntity<>(ErrorInfoResponse.builder().status(HttpStatus.CONFLICT).date(LocalDateTime.now()).message(e.getMessage()).build(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(UnknownHostException.class)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<ErrorInfoResponse> handleException(UnknownHostException exception) {
        return new ResponseEntity<>(ErrorInfoResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).date(LocalDateTime.now()).message(exception.getMessage()).build(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<ErrorInfoResponse> handleException(UsernameNotFoundException exception) {
        return new ResponseEntity<>(ErrorInfoResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).date(LocalDateTime.now()).message(exception.getMessage()).build(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<ErrorInfoResponse> handleException(NotFoundException exception) {
        return new ResponseEntity<>(ErrorInfoResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).date(LocalDateTime.now()).message(exception.getMessage()).build(), HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<ErrorInfoResponse> handleException(HttpRequestMethodNotSupportedException exception) {
        return new ResponseEntity<>(ErrorInfoResponse.builder().status(HttpStatus.UNAUTHORIZED).date(LocalDateTime.now()).message(exception.getMessage()).build(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(RefundNotAvailableException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ResponseEntity<ErrorInfoResponse> handleException(RefundNotAvailableException exception) {
        return new ResponseEntity<>(ErrorInfoResponse.builder().status(HttpStatus.UNAUTHORIZED).date(LocalDateTime.now()).message(exception.getMessage()).build(), HttpStatus.UNAUTHORIZED);
    }
}

