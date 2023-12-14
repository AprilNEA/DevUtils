// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde_json::{Value, Error};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

fn string_to_json(input: &str) -> Result<Value, Error> {
    serde_json::from_str(input)
}

#[tauri::command]
fn validate_json(string_to_validate: &str) -> String {
    match string_to_json(string_to_validate) {
        Ok(json) => serde_json::to_string_pretty(&json).unwrap(),
        Err(e) => format!("Invalid: {}", e)
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
      greet,
      validate_json
    ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
