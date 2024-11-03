# Explanation of Each Component:

### User Model:

Represents individual users, with attributes like username, email, and role (enum).
- __Permissions__: Establishes a many-to-many relationship with Permission through UserPermission.
- __Permission Model__:Represents specific permissions that define what actions are allowed on which resources.

Each permission links to an action (e.g., READ, WRITE) and a resource (e.g., USER, INVENTORY).

- __Users__: Defines a many-to-many relationship with User through UserPermission.
UserPermission Model:

A join model to create a **many-to-many** relationship between User and Permission.
Contains foreign keys userId and permissionId that reference User and Permission, respectively.

The @@unique([userId, permissionId]) constraint ensures each user can have a specific permission only once.

### Enums:

- Role: Defines different user levels, where each level determines access to various resources.
- Action: Specifies what actions a user can perform on resources.
- Resource: Lists types of resources available for permission control, ensuring permissions are well-scoped and organized.
This schema structure ensures that each User can have multiple permissions, while each permission defines specific actions on resources, creating a scalable and well-organized permissions system.