# hms_itk
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
   premium BOOLEAN DEFAULT FALSE,
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
