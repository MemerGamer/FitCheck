namespace FitCheck.Presentation;
public partial class RegisterViewModel : ObservableObject
{
    private IAuthenticationService _authentication;

    private INavigator _navigator;

    private IDispatcher _dispatcher;

    [ObservableProperty]
    private string? _email;

    [ObservableProperty]
    private string? _username;

    [ObservableProperty]
    private string? _password;

    [ObservableProperty]
    private string? _confirmpassword;

    public RegisterViewModel(
        IDispatcher dispatcher,
        INavigator navigator,
        IAuthenticationService authentication)
    {
        _dispatcher = dispatcher;
        _navigator = navigator;
        _authentication = authentication;
        Register = new AsyncRelayCommand(DoRegister);
    }

    private async Task DoRegister()
    {
        var success = await _authentication.(_dispatcher, new Dictionary<string, string> { { nameof(Username), Username ?? string.Empty }, { nameof(Password), Password ?? string.Empty } });
        if (success)
        {
            await _navigator.NavigateViewModelAsync<MainViewModel>(this, qualifier: Qualifiers.ClearBackStack);
        }
    }

    public string Title { get; } = "Register";

    public ICommand Register { get; }
}
