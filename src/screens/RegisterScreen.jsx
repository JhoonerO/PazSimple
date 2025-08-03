"use client"
import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StatusBar, Modal, FlatList, ScrollView } from "react-native"
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from "@expo-google-fonts/poppins"
import { globalStyles, COLORS } from "../styles/globalStyles"
import BackgroundImage from "../components/BackgroundImage"
// Importamos el hook y el componente Toast
import { useToast } from "../hooks/useToast" // Asumiendo que useToast.js está en ../hooks/
import Toast from "../components/Toast" // Asumiendo que Toast.jsx está en ../components/

export default function RegisterScreen({ navigation }) {
  // Estados originales
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Estados para escuela y carrera
  const [selectedSchool, setSelectedSchool] = useState("")
  const [selectedSchoolLabel, setSelectedSchoolLabel] = useState("Selecciona una escuela")
  const [selectedCareer, setSelectedCareer] = useState("")
  const [selectedCareerLabel, setSelectedCareerLabel] = useState("Selecciona una carrera")

  // Estados para controlar modales
  const [schoolModalVisible, setSchoolModalVisible] = useState(false)
  const [careerModalVisible, setCareerModalVisible] = useState(false)
  const [showCareerSelector, setShowCareerSelector] = useState(false)

  // Inicializamos el hook useToast
  const { toastConfig, showToast, hideToast } = useToast()

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  })

  // Datos organizados por escuelas y sus carreras
  const schoolsData = {
    escuela_ciencias: {
      name: "Escuela de Ciencias",
      careers: [
        { label: "Administración de Negocios Internacionales - (SNIES 104323)", value: "admin_negocios" },
        { label: "Ingeniería Informática - (SNIES 105014)", value: "ing_informatica" },
        { label: "Licenciatura en Artes - (SNIES 54117)", value: "lic_artes" },
        { label: "Química - (SNIES 103209)", value: "quimica" },
      ],
    },
    escuela_ciencias_sociales: {
      name: "Escuela de Ciencias Sociales y de las Comunicaciones",
      careers: [
        { label: "Comunicación Social - (SNIES 104544)", value: "comunicacion_social" },
        { label: "Trabajo Social - (SNIES 90876)", value: "trabajo_social" },
        { label: "Derecho - (SNIES 117530)", value: "derecho" },
      ],
    },
    escuela_ing_agroindustrial: {
      name: "Escuela Ingeniería Agroindustrial",
      careers: [
        {
          label: "Técnico en Extracción de Biomasa Enérgetica - Modalidad presencial (SNIES 105897)",
          value: "tecnico_biomasa",
        },
        {
          label: "Tecnología en Procesamiento de Alimentos - Modalidad a distancia (SNIES 105217)",
          value: "tech_alimentos",
        },
        { label: "Ingeniería Agroindustrial - (SNIES 1742)", value: "ing_agroindustrial" },
        { label: "Profesional en Turismo - (SNIES )", value: "prof_turismo" },
      ],
    },
    escuela_ing_agronomica: {
      name: "Escuela Ingeniería Agronómica",
      careers: [{ label: "Ingeniería Agronómica - (SNIES 3139)", value: "ing_agronomica" }],
    },
    escuela_ing_ambiental: {
      name: "Escuela Ingeniería Ambiental y de Saneamiento",
      careers: [
        { label: "Ingeniería Civil - (SNIES 117462)", value: "ing_civil" },
        { label: "Tecnología en Obras Civiles - (SNIES 104768)", value: "tech_obras_civiles" },
        { label: "Ingeniería Ambiental y de Saneamiento - (SNIES 3127)", value: "ing_ambiental" },
      ],
    },
    escuela_ing_produccion: {
      name: "Escuela Ingeniería de Producción",
      careers: [
        {
          label: "Tecnología en Operación de Sistemas Electromecánicos (SNIES 106413)",
          value: "tech_electromecanicos",
        },
        { label: "Tecnología en Seguridad y Salud en el Trabajo (SNIES 103526)", value: "tech_seguridad" },
        { label: "Ingeniería de Producción - (SNIES 102479)", value: "ing_produccion" },
        { label: "Ingeniería en Seguridad y Salud en el Trabajo - (SNIES 107300)", value: "ing_seguridad" },
      ],
    },
    escuela_medicina_veterinaria: {
      name: "Escuela de Medicina Veterinaria y Zootecnia",
      careers: [{ label: "Medicina Veterinaria y Zootecnia - (SNIES 1741)", value: "medicina_veterinaria" }],
    },
  }

  // Array de escuelas para el primer selector
  const schools = Object.keys(schoolsData).map((key) => ({
    label: schoolsData[key].name,
    value: key,
  }))

  // Función para validar email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Función para seleccionar escuela
  const selectSchool = (school) => {
    setSelectedSchool(school.value)
    setSelectedSchoolLabel(school.label)
    setSchoolModalVisible(false)

    // Resetear carrera cuando cambia la escuela
    setSelectedCareer("")
    setSelectedCareerLabel("Selecciona una carrera")

    // Mostrar selector de carrera
    setShowCareerSelector(true)
  }

  // Función para seleccionar carrera
  const selectCareer = (career) => {
    setSelectedCareer(career.value)
    setSelectedCareerLabel(career.label)
    setCareerModalVisible(false)
  }

  const handleRegister = () => {
    // Validar que todos los campos estén completos (incluyendo carrera)
    if (
      !username.trim() ||
      !email.trim() ||
      !age.trim() ||
      !password.trim() ||
      !confirmPassword.trim() ||
      !selectedSchool ||
      !selectedCareer
    ) {
      showToast({ type: "error", title: "Error de Registro", message: "Por favor completa todos los campos" })
      return
    }

    // Validar nombre de usuario
    if (username.length < 3) {
      showToast({
        type: "error",
        title: "Error de Usuario",
        message: "El nombre de usuario debe tener al menos 3 caracteres",
      })
      return
    }

    // Validar email
    if (!validateEmail(email)) {
      showToast({ type: "error", title: "Error de Email", message: "Por favor ingresa un correo electrónico válido" })
      return
    }

    // Validar edad
    const ageNumber = Number.parseInt(age)
    if (isNaN(ageNumber) || ageNumber < 16 || ageNumber > 65) {
      showToast({ type: "error", title: "Error de Edad", message: "Por favor ingresa una edad válida (18-65 años)" })
      return
    }

    // Validar contraseña
    if (password.length < 6) {
      showToast({
        type: "error",
        title: "Error de Contraseña",
        message: "La contraseña debe tener al menos 6 caracteres",
      })
      return
    }

    // Validar confirmación de contraseña
    if (password !== confirmPassword) {
      showToast({ type: "error", title: "Error de Contraseña", message: "Las contraseñas no coinciden" })
      return
    }

    // Mostrar mensaje de éxito con Toast
    showToast({
      type: "success",
      title: "Registro Exitoso",
      message: `¡Bienvenido ${username}!\nTu cuenta ha sido creada.`,
      onHide: () => navigation.navigate("Login"), // Navegar al Login cuando el toast se oculte
    })
  }

  const goToLogin = () => navigation.navigate("Login")

  if (!fontsLoaded) {
    return (
      <View style={globalStyles.loadingContainer}>
        <Text style={globalStyles.loadingText}>Cargando...</Text>
      </View>
    )
  }

  return (
    <View style={[globalStyles.container, globalStyles.centered]}>
      <BackgroundImage source={require("../../assets/bgLoginRegister.png")} overlay={true} opacity={0.4} />
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <Text style={[globalStyles.headerTitle, { position: "absolute", top: 60 }]}>Registro</Text>

      <ScrollView
        style={{ flex: 1, width: "100%" }}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}
      >
        <View style={globalStyles.formContainer}>
          {/* Campo Nombre de Usuario */}
          <TextInput
            style={globalStyles.input}
            placeholder="Nombre de Usuario"
            placeholderTextColor={COLORS.textMuted}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
          />

          {/* Campo Email */}
          <TextInput
            style={globalStyles.input}
            placeholder="Correo Electrónico"
            placeholderTextColor={COLORS.textMuted}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          {/* Campo Edad */}
          <TextInput
            style={globalStyles.input}
            placeholder="Edad"
            placeholderTextColor={COLORS.textMuted}
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            maxLength={2}
          />

          {/* Selector de Escuela */}
          <TouchableOpacity
            style={[globalStyles.input, { justifyContent: "center" }]}
            onPress={() => setSchoolModalVisible(true)}
          >
            <Text
              style={{
                color: selectedSchool ? COLORS.text : COLORS.textMuted,
                fontSize: 16,
              }}
              numberOfLines={1} // Añadido
              ellipsizeMode="tail" // Añadido
            >
              {selectedSchoolLabel}
            </Text>
          </TouchableOpacity>

          {/* Selector de Carrera (solo se muestra si hay escuela seleccionada) */}
          {showCareerSelector && (
            <TouchableOpacity
              style={[globalStyles.input, { justifyContent: "center" }]}
              onPress={() => setCareerModalVisible(true)}
            >
              <Text
                style={{
                  color: selectedCareer ? COLORS.text : COLORS.textMuted,
                  fontSize: 16,
                }}
                numberOfLines={1} // Añadido
                ellipsizeMode="tail" // Añadido
              >
                {selectedCareerLabel}
              </Text>
            </TouchableOpacity>
          )}

          {/* Campo Contraseña */}
          <TextInput
            style={globalStyles.input}
            placeholder="Contraseña"
            placeholderTextColor={COLORS.textMuted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />

          {/* Campo Confirmar Contraseña */}
          <TextInput
            style={globalStyles.input}
            placeholder="Confirmar Contraseña"
            placeholderTextColor={COLORS.textMuted}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
          />

          {/* Botón Registrar */}
          <TouchableOpacity style={globalStyles.primaryButton} onPress={handleRegister}>
            <Text style={globalStyles.primaryButtonText}>Registrar</Text>
          </TouchableOpacity>

          {/* Link para ir al Login */}
          <TouchableOpacity onPress={goToLogin}>
            <Text style={globalStyles.linkText}>
              ¿Ya tienes cuenta? <Text style={globalStyles.linkHighlight}>Inicia sesión</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal para seleccionar escuela */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={schoolModalVisible}
        onRequestClose={() => setSchoolModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.background, // Fondo oscuro del modal
              borderRadius: 10,
              padding: 20,
              width: "90%",
              maxHeight: "70%",
              borderWidth: 1, // Añadir un borde sutil si lo deseas
              borderColor: COLORS.textMuted, // Color del borde
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 15,
                textAlign: "center",
                color: COLORS.text, // Texto claro
              }}
            >
              Selecciona tu escuela
            </Text>

            <FlatList
              data={schools}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    padding: 15,
                    borderBottomWidth: 1,
                    borderBottomColor: COLORS.textMuted, // Separador oscuro sutil
                  }}
                  // Añadir un estilo para el feedback al presionar
                  activeOpacity={0.7}
                  onPress={() => selectSchool(item)}
                >
                  <Text style={{ fontSize: 16, color: COLORS.text }}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={{
                marginTop: 15,
                padding: 10,
                backgroundColor: COLORS.primaryButton, // Usar el color del botón principal
                borderRadius: 5,
                alignItems: "center",
              }}
              onPress={() => setSchoolModalVisible(false)}
            >
              <Text style={globalStyles.primaryButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para seleccionar carrera */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={careerModalVisible}
        onRequestClose={() => setCareerModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.background, // Fondo oscuro del modal
              borderRadius: 10,
              padding: 20,
              width: "90%",
              maxHeight: "70%",
              borderWidth: 1, // Añadir un borde sutil si lo deseas
              borderColor: COLORS.textMuted, // Color del borde
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 15,
                textAlign: "center",
                color: COLORS.text, // Texto claro
              }}
            >
              Selecciona tu carrera
            </Text>

            <FlatList
              data={selectedSchool ? schoolsData[selectedSchool].careers : []}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    padding: 15,
                    borderBottomWidth: 1,
                    borderBottomColor: COLORS.textMuted, // Separador oscuro sutil
                  }}
                  // Añadir un estilo para el feedback al presionar
                  activeOpacity={0.7}
                  onPress={() => selectCareer(item)}
                >
                  <Text style={{ fontSize: 14, color: COLORS.text }}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={{
                marginTop: 15,
                padding: 10,
                backgroundColor: COLORS.primaryButton, // Usar el color del botón principal
                borderRadius: 5,
                alignItems: "center",
              }}
              onPress={() => setCareerModalVisible(false)}
            >
              <Text style={globalStyles.primaryButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Renderiza el componente Toast */}
      <Toast {...toastConfig} onHide={toastConfig.onHide || hideToast} />
    </View>
  )
}
