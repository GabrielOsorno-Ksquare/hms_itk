# hms_itk

## INSTRUCTIONS
- Clone the repository.
- Run 'npm install' in the CMD once you have it local.
- Create the DataBase (I'm using PostgreSQL for this project)
- Fill the user roles (If you are having troubles with this, try inserting all values instead):
```
INSERT INTO Roles (name) VALUES ("ADMIN");
INSERT INTO Roles (name) VALUES ("DOCTOR");
INSERT INTO Roles (name) VALUES ("PATIENT");
```
- Create a '.env' file with all your DataBase configurations:
```
DB_HOSTNAME = localhost
DB_NAME = HMS
DB_PASS = HMSpassword
DB_USER = postgres
PORT = 3002
ENVIRONMENT = asd
GOOGLE_APPLICATION_CREDENTIALS = C:\Users\Gabriel Osorno\Downloads\Firebase_HMS.json
```
- Create/Copy the 'Firebase.json' file and reference it in the '.env':
```
{
  "type": "service_account",
  "project_id": "hms-itk-447e5",
  "private_key_id": "3bc81573ce9dfb30a2dc98652647fe8470601837",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCuSbIH+1YMrDUq\nvI/Cwcab4jDmPETV5FO+W4bEzkbReb/UZPwacGkQhYdr6WF6WWWB0fmd1BZERb0P\nZoEpB8W8KJr84gHAnsTavzqcoNJ/5srV7cDNNX4/SFg/+GgkotdOmGzdqMNvhoup\nnBaPj5QfpxEN7IKvumoAS/iJbVEA7HT39WZRJFTGHC9ax6QGs+Q4xIqmvW1NAV0Z\nErcDr1Bu/wRLZcEDWCW5hUHrAzqg8EFepZ9lgu6sx1IQXY4pd4jKzXCkVsWSILyT\nPxJ7ChnJ5mial1366pFeT37g/FiZbnVsEtWJipVDKhMNu1YgPjdMkWKX73jhIrRp\nO1wp6L1TAgMBAAECggEAD6Qie4/lSY7c2KCCgFZ2lf/HJqpq/Q0YLOG25wuiFGOK\nQSvs6gyDiU2KeTdBHcNPFkb7UVw6wVbG4E5xMfb2GmxEeIRp5tj4zq7RukO+kGbs\ndiV3o5L06QX7kYYgBoWsr+uC/aOLIoOfHhIZfjnC79JE+AxtMAsZPzySKfcrCVuJ\nNRPJ5rD5Z4JzuctrAPGEMV++7Yj03OaFE0cs/X9sXtUS/xUMZ8dxeGlCMvCBI/4R\nClQOhmny36k9gY3d74CvhSR1dOlvTKzlfvkztn9cmft+IReRCSRd2aiwN5cmjC12\ntqBD1bXGmdfyV0A+ZMpL3nZEo+iKKs1mM7CIqO/c8QKBgQDbVlPOClOs90M/mQML\nvz0m/UmSL1ef29hJ2q0kaNWD0YcIzLP1Y8o1ZtyFR8pWicB73iMr7cTgpYI+fVa/\ntk1v0SkqnN5NzDTolvCgX9+ZIyrJdv8ken9R7XbTXJIKwlDAFF1tKY2Cwp7gL0hM\nNpAUH78oCNEZnTcXbBtcVhpqYwKBgQDLa6ilo9ukSHdXHwRN66TqKAFHlcMmLTiS\nU923Iz6GX9DqAySj3pZOhSlUn3LHCXHuGEgWsVQvsPPDFNPb/gIS+dw46WB5xUKA\n1Y80a6+7dk5HV8CciWO9Z6ONMGS6CEzftilioWzxcE5tjjoI43Kbtb+/VBE+43wk\nZS+nUWDcUQKBgEjD9P2P836YcVjx/E6zXShIM1YqGpnQJ4so3vQLS3p10qSatMEe\nIAFjZJla3cej35W4dlamhQA6KGFu1462fi4wZ8XZUO7iZlMbcCzkYZu+TP2VWsPR\nV9foPdmVBmZHXN68YtpKRMYypt6dEREnsNjcR2CSvDwRKiu9E76oWg8dAoGBAIXv\nweAmLoVRzXoIix3/DNu8MXN/0Tk+xyPZon9l7lItnnGmViardU4H8XmtbrZMqr45\nMKX4ZlTsbuPAv+n2qkjySSUTzJkA39PSSXMbgF6u+8WPqtumvoxEQ/S/q2Kt+mfG\nGiO94+xopMsPvXiCwcByf+krIhvFTsTr9t90/pCxAoGBAK2abf+oxxuWpVEd5jfN\nbhgTQKyAdBG5jLGY/R08/52LLys8d3yXHCeXeclDczx7rRbI+LL73uD8AHNqCy1/\nKZZ9xdc3U8xmKPWux3s1liQyudYvVw/haf1Y9Bs72qJYZGsdpND1Ynqj3dHMRR9j\nHYx+dWEcJlLKa9VQdBh2XFHo\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-rihml@hms-itk-447e5.iam.gserviceaccount.com",
  "client_id": "100836542405038751940",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-rihml%40hms-itk-447e5.iam.gserviceaccount.com"
}
```
- Now you can test creating some users and use some Front-end to get your auth-token to keep testing!

## STAGE 2
In this stage, I will create all the endpoints that users can acces to.
![image](https://user-images.githubusercontent.com/113383541/209158237-712f47ab-17b8-4638-93e0-88247e434c51.png)

## STAGE 1
For this stage of the HMS project, I will define the shape of the data that will flow through the server.

## DB Models
### Roles
This model will store the roles that a user can have.<br />
It will help to manage these roles so users can only access the content they are supposed to.<br />
These roles will be referenced at *Users* model.
```
CREATE TABLE Roles (
   id INT AUTO_INCREMENT,
   name VARCHAR(7) NOT NULL,
   PRIMARY KEY (id)
);
```
 - Filling the user roles:
```
INSERT INTO Roles (name) VALUES ("ADMIN");
INSERT INTO Roles (name) VALUES ("DOCTOR");
INSERT INTO Roles (name) VALUES ("PATIENT");
```

### Users
This model will help to manage the basic information that all users will have.<br />
It references an id as *role_id* from *Roles* model.<br />
It will be referenced in *Admins*, *Doctors* and *Patients* models respectively.
```
CREATE TABLE Users (
   birthdate DATE NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   first_name VARCHAR(55) NOT NULL,
   id INT AUTO_INCREMENT,
   is_deleted BOOLEAN DEFAULT FALSE,
   last_name VARCHAR(55),
   password VARCHAR(16) NOT NULL,
   role_id INT NOT NULL,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ON UPDATE CURRENT_TIMESTAMP,
   username VARCHAR(16) NOT NULL,
   PRIMARY KEY (id),
   FOREIGN KEY (role_id)
      REFERENCES Roles(id)
);
```

### Admins
This model will only contain information specific to users with administrator roles.<br />
It references an id from *Users* model.
```
CREATE TABLE Admins (
   id INT AUTO_INCREMENT,
   user_id VARCHAR(255) NOT NULL,
   PRIMARY KEY (id),
   FOREIGN KEY (id)
      REFERENCES Users(id)
);
```

### Doctors
This model will only contain information specific to users with doctor roles.<br />
It references an id from *Users* model.<br />
It will be referenced in *Appointments* model.
```
CREATE TABLE Doctors (
   degree VARCHAR(10),
   id INT AUTO_INCREMENT,
   user_id VARCHAR(255) NOT NULL,
   PRIMARY KEY (id),
   FOREIGN KEY (id)
      REFERENCES Users(id)
);
```

### Patients
This model will only contain information specific to users with patient roles.<br />
It references an id from *Users* model.<br />
It will be referenced in *Appointments* model.
```
CREATE TABLE Patients (
   id INT AUTO_INCREMENT,
   is_premium BOOLEAN DEFAULT FALSE,
   user_id VARCHAR(255) NOT NULL,
   PRIMARY KEY (id),
   FOREIGN KEY (id)
     REFERENCES Users(id)
);
```

### Appointments
This model will help to manage the basic information that all appointments will have.<br />
It references an id as *doctor_id* from *Doctors* model.<br />
It references an id as *patient_id* from *Patients* model.
```
CREATE TABLE Appointments (
   date DATE NOT NULL,
   description VARCHAR(255),
   doctor_id INT NOT NULL,
   id INT AUTO_INCREMENT,
   patient_id INT NOT NULL,
   title VARCHAR(55) NOT NULL,
   PRIMARY KEY (id),
   FOREIGN KEY (doctor_id)
     REFERENCES Doctors(id),
   FOREIGN KEY (patient_id)
     REFERENCES Patients(id)
);
```
