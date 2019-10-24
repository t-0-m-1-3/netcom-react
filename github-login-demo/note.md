I used docker for this
`docker run --name=netcomsql -e MYSQL_ROOT_PASSWORD=root@123 -d mysql`
`docker exec -t -i <container_name> mysql`

If you need to set up mysql server on ubuntu and create connection between nodejs and mysql then you can follow the basic tutorial here

The steps are as follows:

First we need to create a new table in database for registering new users.Drop into mysql shell from terminal using following command:
```bash
mysql -u root -pmysql> show databases
 -> ;
+--------------------+
| Database |
+--------------------+
| information_schema |
| netcomreact |
| mysql |
| performance_schema |
| sys |
+--------------------+
mysql> use netcomsql
Database changed
```

Now that we have selected required database lets create users table in the table by running following command in mysql shell:
```sql
CREATE TABLE `users` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `first_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `last_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
 `created` datetime NOT NULL,
 `modified` datetime NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
```
Exit the mysql shell using following command:

mysql> \c
mysql> exit
