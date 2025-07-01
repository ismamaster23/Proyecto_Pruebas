from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import databasePacientes as dbase
import geneticAlgoritm as galgo
from product import Product
import traceback
from bson import ObjectId
import os

app = Flask(__name__, static_folder='build')
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

# Ruta para servir el archivo index.html
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

# Ruta específica para archivos .map
@app.route('/static/<path:filename>.map')
def ignore_map_files(filename):
    file_path = os.path.join(app.static_folder, filename + '.map')
    return jsonify({
        'filename': filename + '.map',
        'location': file_path
    }), 404

db = dbase.dbConnectionPacientes()
dbDoctor = dbase.dbConnectionDoctor()

# Guardar datos del paciente
@app.route('/api/guardar_datos', methods=['POST'])
def receive_data():
    try:
        data = request.json
        products = db['pacientes']
        
        # Se obtienen los datos del paciente
        nutriologo = data.get("nutriologo")
        nombre = data.get("nombre")
        apelPate = data.get("apelPate")
        apelMate = data.get("apelMate")
        correo = data.get("correo")
        numero = data.get("numero")
        gender = data.get("gender")
        weight = data.get("weight")
        dateOfBirth = data.get("dateOfBirth")
        height = data.get("height")
        circunferencia_brazo = data.get("circunferencia_brazo")
        pliegue_triceps = data.get("pliegue_triceps")
        actiFisica = data.get("actiFisica")
        acidoUrico = data.get("acidoUrico")
        albumina = data.get("albumina")
        colesterol = data.get("colesterol")
        globulina = data.get("globulina")
        tension = data.get("tension")
        hematocrito = data.get("hematocrito")
        proteinas = data.get("proteinas")
        triglicerido = data.get("triglicerido")
        
        # Verificar si ya existe un paciente con el mismo correo
        if products.find_one({"correo": correo}):
            return jsonify({"message": "El correo electrónico ya está registrado"}), 400

        # Inserta los datos en MongoDB
        product = Product(
            nombre, apelPate, apelMate, correo, numero, gender, weight,
            dateOfBirth, height, circunferencia_brazo, pliegue_triceps, actiFisica, 
            acidoUrico, albumina, colesterol, globulina, hematocrito, proteinas, 
            tension, triglicerido, None, None, None, None, None, None, None, None, 
            None, None, None, None, None, None, None, None, nutriologo
        )
        
        result = products.insert_one(product.toDBCollection())

        # Verificar si la inserción fue exitosa
        if result.inserted_id:
            return jsonify({"message": "Datos insertados con éxito", "inserted_id": str(result.inserted_id)}), 200
        else:
            return jsonify({"message": "Error al insertar los datos"}), 500
    except Exception as e:
        traceback.print_exc()
        return jsonify({"message": "Error interno del servidor", "error": str(e)}), 500

# Eliminar paciente
@app.route('/delete/<string:correo>', methods=['DELETE'])
def delete(correo):
    try:
        paciente = db['pacientes']
        result = paciente.delete_one({'correo': correo})

        if result.deleted_count == 1:
            return jsonify({"message": "Paciente eliminado con éxito"}), 200
        else:
            return jsonify({"message": "Error al eliminar el paciente"}), 404
    except Exception as e:
        traceback.print_exc()
        return jsonify({"message": "Error interno del servidor", "error": str(e)}), 500

# Editar datos del paciente
@app.route('/edit/<string:correo_edit>', methods=['POST'])
def edit(correo_edit):
    try:
        data = request.json
        products = db['pacientes']
        
        # Se obtienen los datos del paciente
        update_fields = {
            "nutriologo": data.get("nutriologo"),
            "nombre": data.get("nombre"),
            "apelPate": data.get("apelPate"),
            "apelMate": data.get("apelMate"),
            "numero": data.get("numero"),
            "gender": data.get("gender"),
            "weight": data.get("weight"),
            "dateOfBirth": data.get("dateOfBirth"),
            "height": data.get("height"),
            "actiFisica": data.get("actiFisica"),
            "datosAntopometricos": {
                "circunferencia_brazo": data.get("circunferencia_brazo"),
                "pliegue_triceps": data.get("pliegue_triceps"),
            },
            "datosBiometricos": {
                "acidoUrico": data.get("acidoUrico"),
                "albumina": data.get("albumina"),
                "colesterol": data.get("colesterol"),
                "globulina": data.get("globulina"),
                "tension": data.get("tension"),
                "hematocrito": data.get("hematocrito"),
                "proteinas": data.get("proteinas"),
                "triglicerido": data.get("triglicerido")
            },
            'datosDieta': {
                "AOA AAG": data.get("aoaAAG"),
                "AOA BAG": data.get("aoaBAG"),
                "AOA MAG": data.get("aoaMAG"),
                "AOA MBAG": data.get("aoaMBAG"),
                "Aceites C/P": data.get("aceitesCP"),
                "Aceites S/P": data.get("aceitesSP"),
                "Azucar S/G": data.get("azucarSG"),
                "Cereales C/G": data.get("cerealesCG"),
                "Cereales S/G": data.get("cerealesSG"),
                "Frutas": data.get("frutas"),
                "Leche C/A": data.get("lecheCA"),
                "Leche Des": data.get("lecheDes"),
                "Leche Entera": data.get("lecheEntera"),
                "Leche Semi": data.get("lecheSemi"),
                "Leguminosas": data.get("leguminosas"),
                "Verduras": data.get("verduras")
            }
        }

        result = products.update_one({'correo': correo_edit}, {'$set': update_fields})

        if result.modified_count == 1:
            return jsonify({"message": "Datos actualizados con éxito"}), 200
        else:
            return jsonify({"message": "Error al actualizar los datos o no se encontraron cambios"}), 404
    except Exception as e:
        traceback.print_exc()
        return jsonify({"message": "Error interno del servidor", "error": str(e)}), 500

# Obtener lista de pacientes
@app.route('/obtener', methods=['GET'])
def obtener():
    try:
        products = db['pacientes']
        search_query = request.args.get('query', '')
        email = request.args.get('email', '')

        if not email:
            return jsonify({"message": "Email no proporcionado"}), 400

        query_filter = {"nutriologo": {"$regex": email, "$options": "i"}}

        if search_query:
            # Buscar pacientes cuyo correo contenga la palabra de búsqueda y cuyo nutriologo coincida con el email
            query_filter["correo"] = {"$regex": search_query, "$options": "i"}

        pacientes = products.find(query_filter)

        pacientes_list = []
        for paciente in pacientes:
            paciente['_id'] = str(paciente['_id'])  # Convertir ObjectId a string
            pacientes_list.append(paciente)

        return jsonify(pacientes_list), 200
    except Exception as e:
        traceback.print_exc()
        return jsonify({"message": "Error interno del servidor", "error": str(e)}), 500

# Obtener paciente por correo
@app.route('/obtener-paciente/<string:correo>', methods=['GET'])
def obtener_por_correo(correo):
    try:
        products = db['pacientes']

        # Buscar el paciente por correo
        paciente = products.find_one({"correo": {"$regex": correo, "$options": "i"}})

        if paciente:
            # Convertir ObjectId a string
            paciente['_id'] = str(paciente['_id'])
            return jsonify(paciente), 200
        else:
            return jsonify({"message": "Paciente no encontrado"}), 404
    except Exception as e:
        traceback.print_exc()
        return jsonify({"message": "Error interno del servidor", "error": str(e)}), 500

# Obtener elementos de la dieta
@app.route('/obtener_elementos_algoritmo', methods=['GET'])
def obtener_elementos_algoritmo():
    try:
        # Obtener parámetros de la solicitud
        altura_str = request.args.get('altura')
        peso_str = request.args.get('peso')
        actividad_fisica_str = request.args.get('actividad_fisica')
        sexo = request.args.get('sexo')
        edad_str = request.args.get('edad')
        
        # Verificar que todos los parámetros están presentes
        if not all([altura_str, peso_str, actividad_fisica_str, sexo, edad_str]):
            return jsonify({"error": "Todos los parámetros (altura, peso, actividad_fisica, sexo, edad) son requeridos"}), 400

        # Convertir parámetros a tipos adecuados
        try:
            altura = float(altura_str)
            peso = float(peso_str)
            edad = int(edad_str)
        except ValueError:
            return jsonify({"error": "Altura, peso y edad deben ser números válidos"}), 400

        # Calcular klca_tot basado en los parámetros
        if sexo.lower() == 'hombre':
            klca_tot = 66 + (13.7 * peso) + (5 * altura) - (6.8 * edad)  # Fórmula ejemplo para hombres
        elif sexo.lower() == 'mujer':
            klca_tot = 655 + (9.6 * peso) + (1.8 * altura) - (4.7 * edad)  # Fórmula ejemplo para mujeres
        else:
            return jsonify({"error": "Sexo debe ser 'hombre' o 'mujer'"}), 400

        # Ajustar klca_tot según sea necesario, por ejemplo, sumándole 300
        klca_tot += 300

        if actividad_fisica_str.lower() == 'sedentario':
            klca_tot *= 1.2  # Fórmula ejemplo para sedentario
        elif actividad_fisica_str.lower() == 'poco activo':
            klca_tot *= 1.375  # Fórmula ejemplo para poco activo
        elif actividad_fisica_str.lower() == 'activo moderacion':
            klca_tot *= 1.55  # Fórmula ejemplo para activo moderado
        elif actividad_fisica_str.lower() == 'activo':
            klca_tot *= 1.725  # Fórmula ejemplo para activo
        elif actividad_fisica_str.lower() == 'muy activo':
            klca_tot *= 1.9  # Fórmula ejemplo para muy activo
        else:
            return jsonify({"error": "Actividad fisica debe ser 'sedentario', 'poco activo', 'activo con moderacion', 'activo' o 'muy activo'"}), 400

        # Llamar al algoritmo genético con klca_tot calculado
        result_json = galgo.genetic_algorithm(klca_tot)
        
        return jsonify(result_json), 200
    except Exception as e:
        traceback.print_exc()
        return jsonify({"message": "Error interno del servidor", "error": str(e)}), 500

# Editar dieta del paciente
@app.route('/edit_dieta/<string:correo_edit>', methods=['POST'])
def edit_dieta(correo_edit):
    try:
        data = request.json
        products = db['pacientes']
        
        # Recuperar el documento actual
        paciente = products.find_one({'correo': correo_edit})
        
        if not paciente:
            return jsonify({"message": "Paciente no encontrado"}), 404
        
        # Actualizar solo los campos de datosDieta
        datos_dieta = data.get('datosDieta', {})
        for key, value in datos_dieta.items():
            paciente['datosDieta'][key] = value
        
        result = products.update_one({'correo': correo_edit}, {'$set': {'datosDieta': paciente['datosDieta']}})

        if result.modified_count == 1:
            return jsonify({"message": "Datos actualizados con éxito"}), 200
        else:
            return jsonify({"message": "Error al actualizar los datos o no se encontraron cambios"}), 404
    except Exception as e:
        traceback.print_exc()
        return jsonify({"message": "Error interno del servidor", "error": str(e)}), 500

# Guardar datos del doctor
@app.route('/api/guardar_doctor', methods=['POST'])
def guardar_doctor():
    try:
        data = request.json
        doctors = dbDoctor['doctores']
        
        # Se obtienen los datos del doctor
        nombre = data.get("nombre")
        apellidoPaterno = data.get("apellidoPaterno")
        apellidoMaterno = data.get("apellidoMaterno")
        telefono = data.get("telefono")
        fechaNacimiento = data.get("fechaNacimiento")
        ciudad = data.get("ciudad")
        cedulaProfesional = data.get("cedulaProfesional")
        sexo = data.get("sexo")
        correo = data.get("correo")
        password = data.get("password")
        
        # Verificar si ya existe un doctor con el mismo número de teléfono, cédula profesional o correo
        if doctors.find_one({"telefono": telefono}) or doctors.find_one({"cedulaProfesional": cedulaProfesional}) or doctors.find_one({"correo": correo}):
            return jsonify({"message": "El teléfono, la cédula profesional o el correo ya está registrado"}), 400

        # Generar hash de la contraseña
        hashed_password = generate_password_hash(password)

        # Inserta los datos en MongoDB
        doctor = {
            "nombre": nombre,
            "apellidoPaterno": apellidoPaterno,
            "apellidoMaterno": apellidoMaterno,
            "telefono": telefono,
            "fechaNacimiento": fechaNacimiento,
            "ciudad": ciudad,
            "cedulaProfesional": cedulaProfesional,
            "sexo": sexo,
            "correo": correo,
            "password": hashed_password
        }
        
        result = doctors.insert_one(doctor)

        # Verificar si la inserción fue exitosa
        if result.inserted_id:
            return jsonify({"message": "Datos insertados con éxito", "inserted_id": str(result.inserted_id)}), 200
        else:
            return jsonify({"message": "Error al insertar los datos"}), 500
    except Exception as e:
        traceback.print_exc()
        return jsonify({"message": "Error interno del servidor", "error": str(e)}), 500

# Iniciar sesión
@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.json
        correo = data.get('correo')
        password = data.get('password')

        doctors = dbDoctor['doctores']
        doctor = doctors.find_one({"correo": correo})

        if doctor and check_password_hash(doctor['password'], password):
            return jsonify({"message": "Inicio de sesión exitoso"}), 200
        else:
            return jsonify({"message": "Credenciales inválidas"}), 401
    except Exception as e:
        traceback.print_exc()
        return jsonify({"message": "Error interno del servidor", "error": str(e)}), 500

@app.route('/api/editar_doctor', methods=['PUT'])
def editar_doctor():
    try:
        data = request.json
        doctors = dbDoctor['doctores']
        
        # Se obtienen los datos del doctor
        correo = data.get("correo")
        nombre = data.get("nombre")
        apellidoPaterno = data.get("apellidoPaterno")
        apellidoMaterno = data.get("apellidoMaterno")
        telefono = data.get("telefono")
        fechaNacimiento = data.get("fechaNacimiento")
        ciudad = data.get("ciudad")
        cedulaProfesional = data.get("cedulaProfesional")
        sexo = data.get("sexo")
        password_actual = data.get("password_actual")
        password_nueva = data.get("password_nueva")
        
        # Verificar si el doctor existe
        doctor = doctors.find_one({"correo": correo})
        if not doctor:
            return jsonify({"message": "Doctor no encontrado"}), 404

        # Crear el diccionario de actualización
        update_fields = {
            "nombre": nombre,
            "apellidoPaterno": apellidoPaterno,
            "apellidoMaterno": apellidoMaterno,
            "telefono": telefono,
            "fechaNacimiento": fechaNacimiento,
            "ciudad": ciudad,
            "cedulaProfesional": cedulaProfesional,
            "sexo": sexo
        }

        # Verificar la contraseña actual antes de cambiar a la nueva
        if password_actual and password_nueva:
            if check_password_hash(doctor['password'], password_actual):
                hashed_password_nueva = generate_password_hash(password_nueva)
                update_fields["password"] = hashed_password_nueva
            else:
                return jsonify({"message": "La contraseña actual es incorrecta"}), 400

        # Actualizar los datos del doctor en MongoDB
        result = doctors.update_one({"correo": correo}, {"$set": update_fields})

        if result.modified_count == 1:
            return jsonify({"message": "Datos actualizados con éxito"}), 200
        else:
            return jsonify({"message": "No se realizaron cambios o hubo un error al actualizar los datos"}), 400
    except Exception as e:
        traceback.print_exc()
        return jsonify({"message": "Error interno del servidor", "error": str(e)}), 500
    
@app.route('/api/obtener_doctor', methods=['GET'])
def obtener_doctor():
    try:
        correo = request.args.get('correo')
        doctors = dbDoctor['doctores']
        
        doctor = doctors.find_one({"correo": correo}, {"password": 0})  # Excluir el campo de contraseña
        if not doctor:
            return jsonify({"message": "Doctor no encontrado"}), 404
        
        doctor['_id'] = str(doctor['_id'])  # Convertir ObjectId a string
        
        return jsonify(doctor), 200
    except Exception as e:
        traceback.print_exc()
        return jsonify({"message": "Error interno del servidor", "error": str(e)}), 500

# Modificar solo el nutriologo de un paciente
@app.route('/api/modificar_nutriologo/<string:correo>', methods=['PATCH'])
def modificar_nutriologo(correo):
    try:
        data = request.json
        new_nutriologo = data.get("nutriologo")

        if not new_nutriologo:
            return jsonify({"message": "El campo 'nutriologo' es requerido"}), 400

        products = db['pacientes']

        # Verificar si el paciente existe
        paciente = products.find_one({"correo": correo})
        if not paciente:
            return jsonify({"message": "Paciente no encontrado"}), 404

        # Actualizar solo el campo 'nutriologo'
        result = products.update_one(
            {"correo": correo},
            {"$set": {"nutriologo": new_nutriologo}}
        )

        if result.modified_count == 1:
            return jsonify({"message": "Nutriologo actualizado con éxito"}), 200
        else:
            return jsonify({"message": "No se encontraron cambios o hubo un error al actualizar el nutriologo"}), 400
    except Exception as e:
        traceback.print_exc()
        return jsonify({"message": "Error interno del servidor", "error": str(e)}), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
