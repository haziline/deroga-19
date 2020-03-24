# Deroga-19
During the containment that we are currently living due to the Covid-19, the French government put in place a mandatory document to print only (due to contamination) in order to get out.

Deroga-19 is a POC project built with NodeJs and Koa http server, which will allow French people to easily create their "Certificate of derogatory movement" and avoid wasting paper.
It also helps the police during the controls, since it doesn't require any contact with the person, nor the paper, just a closer scan of the QR code. This will help in stopping the spread of the VIRUS.

The software is free of charge and opensource.

# Security
Deroga-19 is safe to use, since there is no data storage, except the signature image which is encoded in base64 and stored on redis (with a TTL until midnight) due to QR code data limit.
The data that the QR code holds is encrypted with a key that lives as an environement variable and can be renewed each day if needed.

PS: if you spot any issue, please contact me on haziline@protonmail.com or create an issue or even better submit a PR.

# Credits
I would like to thank the opensource community specially the developers who have worked on the tools that dero-19 is powered by.

# Collaboration
I would be glad to review PRs that:

- Help enhance the project
- Add unit tests
- Addapt it to other countries which require such document to go outside

# Licence
[The MIT License (MIT)](LICENSE.md)
