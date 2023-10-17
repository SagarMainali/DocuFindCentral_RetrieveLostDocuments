
# DocuFind Central

DocuFind Central is a web-based application that connects document finders and document owners. The users of this application are the document finders and document owners. Both parties are required to generate a ticket by filling out an application form. Each ticket is displayed in the appropriate navigation based on its label, either 'Found' or 'Lost.' However, these tickets are only displayed to represent the current state of the database. Since it is solely for display purposes, users cannot access confidential data. To resolve a ticket, a newly generated ticket from either party should be matched with the ticket from the opposite party. Afterward, users receive an email at their provided email addresses.
## Application objectives

- To improve document retrieval process by creating a dedicated system to find lost documents and minimize the challenges associated with document loss.
- To enhance user experience by implementing features such as language modes and dark mode, making the system accessible and enjoyable for users.
- To achieve a cost-effective solution by eliminating the need for third-party human resources, reducing the financial burden on users seeking document retrieval.
- To ensure user privacy and streamline the ticket-raising process by removing the requirement for new account sign-ups and ensuring the confidentiality of personal information.
- To achieve efficiency and speed up document retrieval with a well-organized ticket matching system, making it faster and more effective.

## Enhanced UI features

- Multilingual support (English/Nepali) [persistent]
- Light/dark mode toggle [persistent]


## Database setup

Create a MySql database named 'tickets' with these configuration:
- host: 'localhost',
- port: '3307',
- user: 'root',
- password: 'mysql@wb_2023',
- database: 'tickets'

OR

Navigate to the following directory to define your own configuration.

```bash
/server/src/database/dbConfig.js
```

Add three tables:
- unsolved_tickets
- solved_tickets
- feedbacks
## Environment Variables

This project can run without any environment variables. However, if you want the 'automatic-email-sending' feature to work, you will need to add your own email credentials. To do this, navigate to the following directory and edit the existing file.
```bash
/server/.env
``` 
`EMAIL`

`PASSWORD`
## Run Locally

Clone the project

```bash
  git clone https://github.com/SagarMainali/DocuFindCentral_RetrieveLostDocuments.git
```

Go to the project directory

```bash
  cd DocuFindCentral_RetrieveLostDocuments
```

Install dependencies

```bash
  npm install
```

Start the client-server

```bash
  npm run start
```

Start the backend-server

```bash
  npm run server
```