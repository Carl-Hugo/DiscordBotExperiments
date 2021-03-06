"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var generate_command_1 = require("./generate-command");
var CommandArgs_1 = require("./CommandArgs");
var clean_channel_command_1 = require("./clean-channel-command");
var info_command_1 = require("./info-command");
var version_command_1 = require("./version-command");
var ChatCommandManager = /** @class */ (function () {
    function ChatCommandManager(chatterService, echoHelpService) {
        var _this = this;
        this.chatterService = chatterService;
        this.echoHelpService = echoHelpService;
        this.trigger = 'og';
        this.helpSwitch = 'h';
        this.commands = new Array(new generate_command_1.GenerateCommand(this.chatterService), new clean_channel_command_1.CleanChannelCommand(), new info_command_1.InfoCommand(), new version_command_1.VersionCommand(), 
        //
        // Default (echo help)
        new DefaultChatCommand(function (message, commandArgs) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.echoHelp(message, commandArgs)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); }));
    }
    ChatCommandManager.prototype.Handle = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var commandPrefix, commandPrefixLength, startWithCommandPrefix, startWithBotCommandPrefix, args, commandArgs, outputHelp, i, command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        commandPrefix = '!';
                        commandPrefixLength = 1;
                        startWithCommandPrefix = message.content.startsWith(commandPrefix);
                        if (!startWithCommandPrefix) {
                            return [2 /*return*/];
                        }
                        startWithBotCommandPrefix = message.content.startsWith(commandPrefix + commandPrefix);
                        if (message.author.bot) {
                            if (!startWithBotCommandPrefix) {
                                return [2 /*return*/];
                            }
                            commandPrefixLength = 2;
                        }
                        args = message.content.substring(commandPrefixLength).split(' ');
                        if (args.length == 0) {
                            return [2 /*return*/];
                        }
                        if (!(args.length == 1)) return [3 /*break*/, 3];
                        if (!(args[0] === this.trigger)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.echoHelp(message, new CommandArgs_1.CommandArgs(args[0], null, null))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                    case 3:
                        commandArgs = new CommandArgs_1.CommandArgs(args[0].toLowerCase(), args[1].toLowerCase(), args.splice(2));
                        // When the command (trigger) is not !og", exit.
                        if (commandArgs.trigger !== this.trigger) {
                            return [2 /*return*/];
                        }
                        outputHelp = commandArgs.argumentExists(this.helpSwitch);
                        i = 0;
                        _a.label = 4;
                    case 4:
                        if (!(i < this.commands.length)) return [3 /*break*/, 9];
                        command = this.commands[i];
                        if (!command.canHandle(commandArgs)) return [3 /*break*/, 8];
                        if (!outputHelp) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.echoHelpService.echoOne(command, commandArgs, false, message)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        command.handle(message, commandArgs);
                        _a.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        i++;
                        return [3 /*break*/, 4];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ChatCommandManager.prototype.echoHelp = function (message, commandArgs) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // for (let i = 0; i < this.commands.length; i++) {
                    //     const command = this.commands[i];
                    //     const help = command.help(commandArgs);
                    //     await this.echoHelpService.echo(help, false, message);
                    // }
                    return [4 /*yield*/, this.echoHelpService.echoMany(this.commands, commandArgs, false, message)];
                    case 1:
                        // for (let i = 0; i < this.commands.length; i++) {
                        //     const command = this.commands[i];
                        //     const help = command.help(commandArgs);
                        //     await this.echoHelpService.echo(help, false, message);
                        // }
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ChatCommandManager;
}());
exports.ChatCommandManager = ChatCommandManager;
var DefaultChatCommand = /** @class */ (function () {
    function DefaultChatCommand(callback) {
        this.callback = callback;
    }
    DefaultChatCommand.prototype.handle = function (message, commandArgs) {
        this.callback(message, commandArgs);
    };
    DefaultChatCommand.prototype.canHandle = function (commandArgs) {
        return true;
    };
    DefaultChatCommand.prototype.help = function (commandArgs) {
        return {
            command: '!og [command] -h',
            description: 'Shows the specified command help text ot the full help if no command is specified or if an invalid command is specified.'
        };
    };
    return DefaultChatCommand;
}());
//# sourceMappingURL=ChatCommandManager.js.map