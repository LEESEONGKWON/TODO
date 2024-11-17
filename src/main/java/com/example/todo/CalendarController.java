package com.example.todoapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CalendarController {

    @GetMapping("/")
    public String showCalendar() {
        return "index"; // templates 폴더 내 todo_html.html 파일을 반환
    }
}
