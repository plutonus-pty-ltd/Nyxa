echo Enter the same passphrase during all prompts. Passphrase is optional and can be empty.
sudo apt install openssh -y >/dev/null
openssl genrsa -des3 -out ./src/keys/privateKey.pem 4096
openssl rsa -in ./src/keys/privateKey.pem -outform PEM -pubout -out ./src/keys/publicKey.pem
chmod -R o+rwx ./src/keys/
