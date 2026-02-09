class Coffee:

    # initialise coffee with name and price

    def __init__(self, name, price):
        
        self.name = name
        self.price = price

class Order :

    # initialise order with empty list

    def __init__(self):

        self.items = []

    # add coffee to order

    def add_items(self, coffee):

        self.items.append(coffee)

        print(f"Added {coffee.name} to your order (you ho)")

    # calculate price 

    def total(self):

        return sum(item.price for item in self.items)
    
    # show summary order

    def show_order(self):

        if not self.items:

            print("No items in order :0")
            
            return
        
        print("\nYour awful order:")

        for i, item in enumerate(self.items, 1):

            print(f"{i}. {item.name} - ${item.price}")
        
        print(f"Gimme: ${self.total()}\n or else...")

    # handle checkout process 

    def checkout(self):

        if not self.items:

            print("Aint nuffin in yo cart, you broke")

            return
        
        self.show_order()

        confirm = input("You sure you wanna pay up? (y/n) ").strip().lower()

        if confirm == 'y':

            print("Thanks for your money, you sucker!")

            self.items.clear()

        else:

            print("Order cancelled, what a LOSER!")

# display menu and handle user input

def main(): 

    menu = [

        Coffee("Espresso", 2.50),
        Coffee("Latte", 3.50),
        Coffee("Cappuccino", 3.00),
        Coffee("Americano with salt", 2.00),
        Coffee("Mocha", 4.00),
        Coffee("this makes you poo", 100.00),
        Coffee("crapinator 5000", 5000.00),
        Coffee("Laxatives", 2.00)
    ]

    order = Order()

    # user interaction

    while True:

        print("\n--- Coffee Menu ---")

        for i, coffee in enumerate(menu, 1):

            print(f"{i}. {coffee.name} - ${coffee.price}")

        print("9. View Order b4 u regret")

        print("10. Checkout NOW")

        print("11. GET OUT")

        choice = input("Choose an option or leeve: ")

        if choice in ['1','2','3','4','5','6','7','8']:

            order.add_items(menu[int(choice) - 1])

        elif choice == '9':

            order.show_order()
        
        elif choice == '10':

            order.checkout()

        elif choice == '11':

            print("Cheers for the free money")

            break

        else:

            print("Wrong input - YOU SUCK")

if __name__ == "__main__":

    main()         
