# Вычислитель отличий

![Node.js CI](https://github.com/romanzemerov/frontend-project-lvl2/workflows/Node.js%20CI/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/65cf79e09080d2dc9c1c/maintainability)](https://codeclimate.com/github/romanzemerov/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/65cf79e09080d2dc9c1c/test_coverage)](https://codeclimate.com/github/romanzemerov/frontend-project-lvl2/test_coverage)

## Описание

Утилита для поиска отличий в конфигурационных файлах. Поддерживает несколько форматов данных(json, yaml, ini) и генерирует на их основе отчет. Отчет можем быть сгенерирован в виде простого текста, наглядном отформатированном виде, а также в формате json.

## Установка

### Установка зависимостей

```
make install
```

### Создание npm-пакета

```
make publish
```

### Установка npm-пакета

```
npm link
```

## Запуск тестов

```
make test
```

## Как использовать

### Вывод справочной информации

```
gendiff -h
```

### Сравнение двух файлов

```
gendiff [options] <firstFile> <secondFile>
```

Поддерживается несколько форматов вывода отличий: stylish(по умолчанию), plain и json;

```
gendiff --format [type] <firstFile> <secondFile>
```

## Примеры работы

### Вывод отличий в наглядном виде

[![asciicast](https://asciinema.org/a/x84sa6QMZdcwL81hyD2VnBx9z.svg)](https://asciinema.org/a/x84sa6QMZdcwL81hyD2VnBx9z)

### Вывод отличий в текстовом виде

[![asciicast](https://asciinema.org/a/wE2Fd8PBkFhepCI3Z0yS5p3P5.svg)](https://asciinema.org/a/wE2Fd8PBkFhepCI3Z0yS5p3P5)

### Вывод отличий в формате json

[![asciicast](https://asciinema.org/a/ZDJTEgiJ3tY8dHKgi9Id3sQiz.svg)](https://asciinema.org/a/ZDJTEgiJ3tY8dHKgi9Id3sQiz)
