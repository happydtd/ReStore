using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("BasketItems")]
    public class BasketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }

        // navigation properties
        public int ProductId { get; set; }
        public Product Product { get; set; }

        //目的是强制删除basketitem if basket不存在
        public int BasketId { get; set; }
        public Basket Basket { get; set; }
    }
}