# with open("10-million-password-list-top-100000.txt") as file:
#     passwords_list = [password[:-2] for password in file.readlines()]
    
# passwords_list = set(passwords_list)

# with open("list_of_password.txt", mode="w") as file:
#     file.write(str(passwords_list))

# print(len(passwords_list))


password = input()

with open("common_passwords/list_of_passwords.txt") as file:
        common_passwords = file.read()
        if password in common_passwords:
            raise ValueError