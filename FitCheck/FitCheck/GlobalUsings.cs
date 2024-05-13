global using System.Collections.Immutable;
global using Microsoft.Extensions.DependencyInjection;
global using Microsoft.Extensions.Hosting;
global using Microsoft.Extensions.Localization;
global using Microsoft.Extensions.Logging;
global using Microsoft.Extensions.Options;
global using FitCheck.Models;
global using FitCheck.Presentation;
global using FitCheck.DataContracts;
global using FitCheck.DataContracts.Serialization;
global using FitCheck.Services.Caching;
global using FitCheck.Services.Endpoints;
#if MAUI_EMBEDDING
global using FitCheck.MauiControls;
#endif
global using ApplicationExecutionState = Windows.ApplicationModel.Activation.ApplicationExecutionState;
global using CommunityToolkit.Mvvm.ComponentModel;
global using CommunityToolkit.Mvvm.Input;
