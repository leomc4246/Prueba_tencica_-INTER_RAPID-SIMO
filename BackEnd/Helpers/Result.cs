namespace EstudianteCRUD.Helpers
{
    public readonly record struct Result(bool Success, string? Error = null)
    {
        public static Result Ok() => new(true);
        public static Result Fail(string e) => new(false, e);
    }
}
