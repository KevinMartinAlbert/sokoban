# Sokoban

This is a project I made in two small weeks. The goal was to create a sokoban-like with added features.

## basic Sokoban

The base game allows the player to move around in a 2D grid-based space and move boxes. The player cannot move more than one box at a time. To succeed the player should put all the boxes on the buttons.

## added features

I wanted to add some new gameplay elements to the base game :

- Boxes have a type (wood or metal).
- Depending on the type, the Boxes can either be set on fire or electrified.
- Buttons can have requirements : only valid if pressed on by a burning box or an electrified box.
- The game uses a sprite sheet system so a level in world N will use spritesheet N.

## How I work

I start a new project every two weeks, and I won't continue or improve a project past that time. This is a way to challenge myself into learning new things rapidly. My various projects can be rough around the edges or reflect poor code structure. This is part of learning, I only get better after every mistake.

I also intend to remake some projects in the future and that's one big reason why I don't put more than two weeks into a project. I know I'll redo it much better in a few months, I want to see my progress.

(I might add levels to sokoban or just improve the console.log() telling you good job to an alert but nothing more, I'll keep the bug* and assume I couldn't do better in two weeks for my first game)

I remember following a course on openclassrooms.com where the founder Mathieu Nebra wrote that one of his first project was to create a sokoban game. I thought that was a great idea and decided to go the same way. I also decided to add some features which interested me like the sprite sheet system and the environment interactions with fire and electricity depending on the box type.

*the final level repeating itself infinitely is obviously a feature. It is the survival mode that you didn't know you wanted (I didn't know I wanted it either !). And certainly not a bug. I promise. Not being able to restart a level is a feature inspired by the dark souls serie obviously. I promise.

## Class diagram

![diagramme de classe](assets/readme/class_diagram.png)
