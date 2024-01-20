# CMSApp

![CMSApp Screenshot](https://github.com/Vetagiri-Hrushikesh/CMS/assets/58148267/030a2826-5768-4bf1-9aee-46df2074a0d0)

## Setup Instructions

### Database Setup

Navigate to the `CMS` directory and then to the `cms-scripts` directory. Run the following command to set up the database:<br />
Make sure `MSQL_EXECUTABLE` is located in this path if not please update in `cms-scripts/setup-database.sh`

```
MYSQL_EXECUTABLE="/Applications/XAMPP/xamppfiles/bin/mysql"
```

```bash
cd CMS
cd cms-scripts
./setup-database.sh
```
<img width="776" alt="Screenshot 2024-01-20 at 10 39 29 AM" src="https://github.com/Vetagiri-Hrushikesh/CMS/assets/58148267/8adb9e95-c2f7-4868-919f-570f9808c48e">

```
r - reset database
c - create database
d - delete database
```
`Press r`

### Client Setup

Navigate to the `CMS` directory and then to the `cms-client` directory. Run the following command to set up the database:

```bash
cd ../cms-client
npm install --legacy-peer-deps
npm start
```

### Server Setup

Navigate to the `CMS` directory and then to the `cms-server` directory. Run the following command to set up the database:

```bash
cd ../cms-server
npm install --legacy-peer-deps
npm run dev
```

