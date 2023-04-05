from http import client
import discord
import random
from time import sleep, time
from discord.ext import commands; client
from changeyear import changey
import json
from botauth import createnewuser


allowedids = [845055450884866048, 516719050160734208]
boty = commands.Bot(command_prefix = '>:')


def changeyeardelay(time):
    if time == 0:
        sleep(86.400)
        return changeyeardelay(0)

    elif time < 0:
        return -1

    else:
        sleep(time)
        return changeyeardelay(0)

def split(word):

    return [char for char in word]

#@boty.event
#async def on_ready():
#    print('TheVanishBot operational... impressive')



@boty.command()
async def omnissiah(ctx):
    await ctx.channel.purge(limit = 1)
    await ctx.send('Omnissiah be praised :pray: https://tenor.com/view/mechanicus-techpriest-warhammer-machine-spirit-omnissiah-gif-20384129')


@boty.command()
async def changeyear(ctx, arg1):
    if "admin" in [i.name.lower() for i in ctx.author.roles]:
        tempinho = int(arg1)
        await ctx.channel.purge(limit=1)
        await ctx.send('Next update in')
        await ctx.send(tempinho)
        await ctx.send('seconds')
        print(tempinho*2)
        f = 1
        while f == 1:
            print('começo')
            if tempinho == 0:
                print('vou dormir')
                time.sleep(86.400)
            else:
                print('update')
            await ctx.send('============================START============================')
            i = 0
            j = 0
            dump = [] #changey()
            sizeofdump = len(dump)
            while j < sizeofdump:
                if dump[j] == ['£1']:
                    print(dump[j])
                    print("Achei")
                    break
                else:
                    print(dump[j])
                    j = j + 1
            while i < j:
                await ctx.send(dump[i])
                i = i + 1
            await ctx.send('Omnissiah be praised :pray: https://tenor.com/view/mechanicus-techpriest-warhammer-machine-spirit-omnissiah-gif-20384129')
            await ctx.send('============================END==============================')
            if tempinho != 0:
                await ctx.send("Year updated by:")
                await ctx.send(ctx.author)
                await ctx.send("next update in 24 hours")
                time.sleep(tempinho)
                tempinho = 0
                continue
    else:
        await ctx.send('Acess Denied')
        await ctx.send('https://tenor.com/view/im-sorry-dave-im-afraid-i-cant-do-that-gif-12928790')
        print("Illegal use of Changeyear command by: ")
        print(ctx.author)
@boty.command()
async def reverse(ctx, *args):
    await ctx.channel.purge(limit = 1 )
    entrada = args
    print(entrada)
    pilha = []
    saida = ""
    str1 = ""
    i = 0
    lista1 = list(entrada)
    for ele in lista1:
        str1 += ele
    lista = list(str1)

    while i < len(lista):
        pilha.append(lista[i])
        i = i + 1
    i = 0
    while i < len(lista):
        saida += (pilha.pop())
        i = i + 1
    await ctx.send(saida)
    
    
@boty.command()
async def selfdestruct(ctx):
    await ctx.send('Acess Denied')
    await ctx.send('https://tenor.com/view/im-sorry-dave-im-afraid-i-cant-do-that-gif-12928790')
    print("Illegal use of self-destruct command")
    
    
@boty.command()
async def ban(ctx):
    await ctx.send('Considere-se banido')

@boty.event
async def on_message(message):
    msg = message.content
    if isinstance(message.channel, discord.channel.DMChannel) and message.author != boty.user:

        if msg.startswith('help'):
        
            if (message.author.id in allowedids):
            
                await message.author.send("Well hello there! To create a user you will need to send me a message with create, the name, password, discordtag and email. Example: create vanish 123 vanish#1111 vanish@vanish.com\nIf you wish help with changing the year, type help2 on my dms")
            else: 
            
                await message.author.send("I am sorry you are not authorized")
            
        if msg.startswith('help2'):
            
            if (message.author.id in allowedids):
            
                await message.author.send("The Broken Fantasy year changer site is located on WIP, any user logged there will have access to the change year button")
            else: 
            
                await message.author.send("I am sorry you are not authorized")
            
            
        if msg.startswith('create'):
            if message.author.id in allowedids:
                submit = msg.split(' ')

                await message.author.send(createnewuser(submit))
            else: 
            
                await message.author.send("I am sorry you are not authorized")

with open("Server\Bot\discordtoken.json", 'r') as f:
    discordtoken = json.load(f)   

boty.run(discordtoken['token'])
