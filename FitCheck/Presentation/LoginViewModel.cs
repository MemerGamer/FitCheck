namespace FitCheck.Presentation;

public partial class LoginViewModel : ObservableObject
{
    private IAuthenticationService _authentication;

    private INavigator _navigator;

    private IDispatcher _dispatcher;

    [ObservableProperty]
    private string? _username;

    [ObservableProperty]
    private string? _password;

    public LoginViewModel(
        IDispatcher dispatcher,
        INavigator navigator,
        IAuthenticationService authentication)
    {
        _dispatcher = dispatcher;
        _navigator = navigator;
        _authentication = authentication;
        Login = new AsyncRelayCommand(DoLogin);
    }

    private async Task DoLogin()
    {
        var success = await _authentication.LoginAsync(_dispatcher, new Dictionary<string, string> { { nameof(Username), Username ?? string.Empty }, { nameof(Password), Password ?? string.Empty } });
        if (success)
        {
            await _navigator.NavigateViewModelAsync<MainViewModel>(this, qualifier: Qualifiers.ClearBackStack);
        }
    }

    public string Title { get; } = "Login";

    public ICommand Login { get; }
}
