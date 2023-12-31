"""Change length of task description

Revision ID: f9e8644bd92e
Revises: e6421ba61582
Create Date: 2023-11-06 23:15:21.132786

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f9e8644bd92e'
down_revision: Union[str, None] = 'e6421ba61582'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('tasks', 'description',
               existing_type=sa.VARCHAR(length=150),
               type_=sa.String(length=400),
               existing_nullable=True)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('tasks', 'description',
               existing_type=sa.String(length=400),
               type_=sa.VARCHAR(length=150),
               existing_nullable=True)
    # ### end Alembic commands ###
