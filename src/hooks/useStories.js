"use client"

import { useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

// Historias iniciales (las que ya teníamos)
const initialStories = [
  {
    id: 1,
    title: "La niña de los baños",
    author: "Andrés",
    preview: "Cuando golpeaba la puerta, no había respuesta...",
    image: require("../../assets/tecnico1.1.jpg"),
    likes: 3,
    comments: 1,
    content: "Dicen que en el baño del cuarto piso, al fondo, aparece una niña llamada Lucía...",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "El pasillo",
    author: "Julia",
    preview: "Cuando golpeaba la puerta...",
    image: require("../../assets/tecnico1.jpg"),
    likes: 5,
    comments: 2,
    content: "Un largo corredor sin fin, donde los pasos resuenan eternamente...",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Misterio en UniPaz",
    author: "Carlos",
    preview: "En los pasillos de la universidad...",
    image: require("../../assets/unipaz1.jpg"),
    likes: 1,
    comments: 0,
    content: "Otra historia misteriosa del campus universitario...",
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    title: "El laboratorio abandonado",
    author: "María",
    preview: "Luces que se encienden solas...",
    image: require("../../assets/tecnico2.jpg"),
    likes: 3,
    comments: 1,
    content: "Dicen que en el laboratorio del segundo piso, después de medianoche, los equipos se encienden solos...",
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    title: "La biblioteca silenciosa",
    author: "Pedro",
    preview: "Páginas que se voltean solas...",
    image: require("../../assets/tecnico3.jpg"),
    likes: 5,
    comments: 2,
    content: "En la biblioteca, algunos libros parecen tener vida propia...",
    createdAt: new Date().toISOString(),
  },
  {
    id: 6,
    title: "El aula 301",
    author: "Ana",
    preview: "Voces sin cuerpo...",
    image: require("../../assets/unipaz2.jpg"),
    likes: 1,
    comments: 0,
    content: "En el aula 301, durante las noches, se escuchan clases fantasma...",
    createdAt: new Date().toISOString(),
  },
  {
    id: 7,
    title: "El técnico fantasma",
    author: "Diego",
    preview: "Un técnico que nunca se fue...",
    image: require("../../assets/tecnico4.jpg"),
    likes: 4,
    comments: 3,
    content: "Dicen que en el cuarto de mantenimiento, aún trabaja un técnico que murió hace años...",
    createdAt: new Date().toISOString(),
  },
]

const STORIES_STORAGE_KEY = "@paz_stories"

export const useStories = () => {
  const [stories, setStories] = useState(initialStories)
  const [loading, setLoading] = useState(true)

  // Cargar historias desde AsyncStorage al iniciar
  useEffect(() => {
    loadStoriesFromStorage()
  }, [])

  const loadStoriesFromStorage = async () => {
    try {
      const storedStories = await AsyncStorage.getItem(STORIES_STORAGE_KEY)
      if (storedStories) {
        const parsedStories = JSON.parse(storedStories)
        setStories(parsedStories)
      } else {
        // Si no hay historias guardadas, guardar las iniciales
        await AsyncStorage.setItem(STORIES_STORAGE_KEY, JSON.stringify(initialStories))
      }
    } catch (error) {
      console.error("Error loading stories:", error)
    } finally {
      setLoading(false)
    }
  }

  const saveStoriesToStorage = async (updatedStories) => {
    try {
      await AsyncStorage.setItem(STORIES_STORAGE_KEY, JSON.stringify(updatedStories))
    } catch (error) {
      console.error("Error saving stories:", error)
    }
  }

  const addStory = async (newStoryData) => {
    try {
      const newStory = {
        id: Date.now(), // ID único basado en timestamp
        ...newStoryData,
        likes: 0,
        comments: 0,
        createdAt: new Date().toISOString(),
      }

      const updatedStories = [newStory, ...stories] // Agregar al inicio
      setStories(updatedStories)
      await saveStoriesToStorage(updatedStories)

      return newStory
    } catch (error) {
      console.error("Error adding story:", error)
      throw error
    }
  }

  const updateStory = async (storyId, updates) => {
    try {
      const updatedStories = stories.map((story) => (story.id === storyId ? { ...story, ...updates } : story))
      setStories(updatedStories)
      await saveStoriesToStorage(updatedStories)
    } catch (error) {
      console.error("Error updating story:", error)
    }
  }

  const getStoryById = (id) => {
    return stories.find((story) => story.id === id)
  }

  return {
    stories,
    loading,
    addStory,
    updateStory,
    getStoryById,
    refreshStories: loadStoriesFromStorage,
  }
}
