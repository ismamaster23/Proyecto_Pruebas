class Product:
    def __init__(self, nombre, apelPate, apelMate, correo, numero, gender, weight,
                 dateOfBirth, height, circunferencia_brazo, pliegue_triceps, actiFisica, acidoUrico,
                 albumina, colesterol, globulina, hematocrito, proteinas, tension, triglicerido,
                 aoaAAG, aoaBAG, aoaMAG, aoaMBAG, aceitesCP, aceitesSP, azucarSG, cerealesCG, cerealesSG,
                 frutas, lecheCA, lecheDes, lecheEntera, lecheSemi, leguminosas, verduras, nutriologo):
        
        self.nombre = nombre
        self.apelPate = apelPate
        self.apelMate = apelMate
        self.correo = correo
        self.numero = numero
        self.gender = gender
        self.weight = weight
        self.dateOfBirth = dateOfBirth
        self.height = height
        self.circunferencia_brazo = circunferencia_brazo
        self.pliegue_triceps = pliegue_triceps
        self.actiFisica = actiFisica
        self.acidoUrico = acidoUrico
        self.albumina = albumina
        self.colesterol = colesterol
        self.globulina = globulina
        self.hematocrito = hematocrito
        self.proteinas = proteinas
        self.tension = tension
        self.triglicerido = triglicerido
        self.aoaAAG = aoaAAG
        self.aoaBAG = aoaBAG
        self.aoaMAG = aoaMAG
        self.aoaMBAG = aoaMBAG
        self.aceitesCP = aceitesCP
        self.aceitesSP = aceitesSP
        self.azucarSG = azucarSG
        self.cerealesCG = cerealesCG
        self.cerealesSG = cerealesSG
        self.frutas = frutas
        self.lecheCA = lecheCA
        self.lecheDes = lecheDes
        self.lecheEntera = lecheEntera
        self.lecheSemi = lecheSemi
        self.leguminosas = leguminosas
        self.verduras = verduras
        self.nutriologo = nutriologo

    def toDBCollection(self):
        return{
            'nutriologo': self.nutriologo,
            'nombre': self.nombre,
            'apelPate': self.apelPate,
            'apelMate': self.apelMate,
            'correo': self.correo,
            'numero': self.numero,
            'gender': self.gender,
            'weight': self.weight,
            'dateOfBirth': self.dateOfBirth,
            'height': self.height,
            'actiFisica': self.actiFisica,
            'datosAntopometricos': {
                'circunferencia_brazo': self.circunferencia_brazo,
                'pliegue_triceps': self.pliegue_triceps,
            },
            'datosBiometricos': {
                'acidoUrico': self.acidoUrico,
                'albumina': self.albumina,
                'colesterol': self.colesterol,
                'globulina': self.globulina,
                'hematocrito': self.hematocrito,
                'proteinas': self.proteinas,
                'tension': self.tension,
                'triglicerido': self.triglicerido
            },
            'datosDieta': {
                'AOA AAG': self.aoaAAG,
                'AOA BAG': self.aoaBAG,
                'AOA MAG': self.aoaMAG,
                'AOA MBAG': self.aoaMBAG,
                'Aceites C/P': self.aceitesCP,
                'Aceites S/P': self.aceitesSP,
                'Azucar S/G': self.azucarSG,
                'Cereales C/G': self.cerealesCG,
                'Cereales S/G': self.cerealesSG,
                'Frutas': self.frutas,
                'Leche C/A': self.lecheCA,
                'Leche Des': self.lecheDes,
                'Leche Entera': self.lecheEntera,
                'Leche Semi': self.lecheSemi,
                'Leguminosas': self.leguminosas,
                'Verduras': self.verduras
            }
        }
